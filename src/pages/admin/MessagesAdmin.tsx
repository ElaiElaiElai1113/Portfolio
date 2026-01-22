import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminListMessages, adminUpdateMessageStatus } from "@/services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Mail, Phone, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MessagesAdmin() {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: adminListMessages,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminUpdateMessageStatus(id, status),
    onSuccess: () => {
      toast({
        title: "Status updated",
        description: "Message status has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>;
      case "read":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">Read</Badge>
        );
      case "replied":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Replied</Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Manage messages from the contact form
        </p>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : messages && messages.length > 0 ? (
          messages.map((message) => (
            <Card
              key={message.id}
              className={
                message.status === "new"
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/10"
                  : ""
              }
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{message.subject}</CardTitle>
                    <CardDescription className="mt-2">
                      From {message.name}
                    </CardDescription>
                  </div>
                  {getStatusBadge(message.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${message.email}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {message.email}
                      </a>
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a
                          href={`tel:${message.phone}`}
                          className="hover:text-foreground transition-colors"
                        >
                          {message.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(message.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap text-sm">
                      {message.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`status-${message.id}`}
                        className="text-sm font-medium"
                      >
                        Status:
                      </label>
                      <Select
                        value={message.status}
                        onValueChange={(status) =>
                          handleStatusChange(message.id, status)
                        }
                        disabled={updateStatusMutation.isPending}
                      >
                        <SelectTrigger
                          id={`status-${message.id}`}
                          className="w-[140px]"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        (window.location.href = `mailto:${message.email}`)
                      }
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No messages yet.</p>
              <p className="text-sm mt-2">
                Messages sent through the contact form will appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
