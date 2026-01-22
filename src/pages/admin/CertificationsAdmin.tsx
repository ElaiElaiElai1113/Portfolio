import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  adminListCertifications,
  adminDeleteCertification,
  adminUpsertCertification,
} from "@/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Edit2,
  Trash2,
  Award,
  ExternalLink,
  Calendar,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CertificationsAdmin() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    issue_date: "",
    credential_url: "",
    badge_image_url: "",
  });

  const { data: certifications, isLoading } = useQuery({
    queryKey: ["admin", "certifications"],
    queryFn: adminListCertifications,
  });

  const upsertMutation = useMutation({
    mutationFn: (data: any) => adminUpsertCertification(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: editingId
          ? "Certification updated"
          : "Certification added",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "certifications"] });
      setDialogOpen(false);
      setEditingId(null);
      setFormData({
        name: "",
        issuer: "",
        issue_date: "",
        credential_url: "",
        badge_image_url: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save certification",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteCertification,
    onSuccess: () => {
      toast({
        title: "Certification deleted",
        description: "The certification has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "certifications"] });
      setDeleteDialogOpen(false);
      setDeletingId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete certification",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (cert: any) => {
    setEditingId(cert.id);
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      issue_date: cert.issue_date,
      credential_url: cert.credential_url || "",
      badge_image_url: cert.badge_image_url || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    upsertMutation.mutate({
      id: editingId,
      name: formData.name,
      issuer: formData.issuer,
      issue_date: formData.issue_date,
      credential_url: formData.credential_url || null,
      badge_image_url: formData.badge_image_url || null,
      sort_order: 0,
    });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newCertifications = [...(certifications || [])];
    [newCertifications[index], newCertifications[index - 1]] = [
      newCertifications[index - 1],
      newCertifications[index],
    ];
    newCertifications.forEach((cert, i) => {
      adminUpsertCertification({ ...cert, sort_order: i });
    });
    queryClient.invalidateQueries({ queryKey: ["admin", "certifications"] });
  };

  const moveDown = (index: number) => {
    if (!certifications || index === certifications.length - 1) return;
    const newCertifications = [...certifications];
    [newCertifications[index], newCertifications[index + 1]] = [
      newCertifications[index + 1],
      newCertifications[index],
    ];
    newCertifications.forEach((cert, i) => {
      adminUpsertCertification({ ...cert, sort_order: i });
    });
    queryClient.invalidateQueries({ queryKey: ["admin", "certifications"] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certifications</h1>
          <p className="text-muted-foreground mt-1">
            Manage your professional certifications
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingId(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Certification" : "Add Certification"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Certification Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuer">Issuer *</Label>
                <Input
                  id="issuer"
                  value={formData.issuer}
                  onChange={(e) =>
                    setFormData({ ...formData, issuer: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue_date">Issue Date *</Label>
                <Input
                  id="issue_date"
                  type="date"
                  value={formData.issue_date}
                  onChange={(e) =>
                    setFormData({ ...formData, issue_date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credential_url">Credential URL</Label>
                <Input
                  id="credential_url"
                  type="url"
                  value={formData.credential_url}
                  onChange={(e) =>
                    setFormData({ ...formData, credential_url: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="badge_image_url">Badge Image URL</Label>
                <Input
                  id="badge_image_url"
                  type="url"
                  value={formData.badge_image_url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      badge_image_url: e.target.value,
                    })
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending
                    ? "Saving..."
                    : editingId
                      ? "Update"
                      : "Add"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Certifications Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-20 w-20 rounded-full mb-4 mx-auto" />
                  <Skeleton className="h-6 w-3/4 mb-2 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : certifications && certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <Card key={cert.id}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  {cert.badge_image_url ? (
                    <img
                      src={cert.badge_image_url}
                      alt={cert.name}
                      className="h-20 w-20 rounded-full object-contain bg-muted"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                      <Award className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1 w-full">
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {cert.issuer}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(cert.issue_date).toLocaleDateString()}
                      </span>
                    </div>

                    {cert.credential_url && (
                      <Button
                        variant="link"
                        size="sm"
                        asChild
                        className="h-auto p-0"
                      >
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs"
                        >
                          View Credential
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-1"
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-1"
                      onClick={() => moveDown(index)}
                      disabled={index === (certifications?.length || 0) - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(cert)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(cert.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-muted-foreground">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No certifications yet.</p>
              <p className="text-sm mt-2">
                Add your professional certifications to showcase your expertise.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this certification? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && deleteMutation.mutate(deletingId)}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
