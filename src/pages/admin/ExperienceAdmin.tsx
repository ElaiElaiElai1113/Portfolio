import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  adminListExperiences,
  adminDeleteExperience,
  adminUpsertExperience,
} from "@/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Edit2,
  Trash2,
  Building2,
  MapPin,
  Calendar,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExperienceAdmin() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    start_date: "",
    end_date: "",
    bullets: "",
    skills: "",
  });

  const { data: experiences, isLoading } = useQuery({
    queryKey: ["admin", "experiences"],
    queryFn: adminListExperiences,
  });

  const upsertMutation = useMutation({
    mutationFn: (data: any) => adminUpsertExperience(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: editingId ? "Experience updated" : "Experience added",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "experiences"] });
      setDialogOpen(false);
      setEditingId(null);
      setFormData({
        company: "",
        role: "",
        location: "",
        start_date: "",
        end_date: "",
        bullets: "",
        skills: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save experience",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteExperience,
    onSuccess: () => {
      toast({
        title: "Experience deleted",
        description: "The experience has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "experiences"] });
      setDeleteDialogOpen(false);
      setDeletingId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete experience",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (exp: any) => {
    setEditingId(exp.id);
    setFormData({
      company: exp.company,
      role: exp.role,
      location: exp.location,
      start_date: exp.start_date,
      end_date: exp.end_date || "",
      bullets: exp.bullets.join("\n"),
      skills: exp.skills.join(", "),
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bullets = formData.bullets
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);
    const skills = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    upsertMutation.mutate({
      id: editingId,
      company: formData.company,
      role: formData.role,
      location: formData.location,
      start_date: formData.start_date,
      end_date: formData.end_date || null,
      bullets,
      skills,
      sort_order: 0,
    });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newExperiences = [...(experiences || [])];
    [newExperiences[index], newExperiences[index - 1]] = [
      newExperiences[index - 1],
      newExperiences[index],
    ];
    // Update sort orders and save
    newExperiences.forEach((exp, i) => {
      adminUpsertExperience({ ...exp, sort_order: i });
    });
    queryClient.invalidateQueries({ queryKey: ["admin", "experiences"] });
  };

  const moveDown = (index: number) => {
    if (!experiences || index === experiences.length - 1) return;
    const newExperiences = [...experiences];
    [newExperiences[index], newExperiences[index + 1]] = [
      newExperiences[index + 1],
      newExperiences[index],
    ];
    // Update sort orders and save
    newExperiences.forEach((exp, i) => {
      adminUpsertExperience({ ...exp, sort_order: i });
    });
    queryClient.invalidateQueries({ queryKey: ["admin", "experiences"] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-muted-foreground mt-1">
            Manage your work experience
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingId(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Experience" : "Add Experience"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date *</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty for current position
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bullets">Bullet Points (one per line)</Label>
                <Textarea
                  id="bullets"
                  value={formData.bullets}
                  onChange={(e) =>
                    setFormData({ ...formData, bullets: e.target.value })
                  }
                  rows={6}
                  placeholder="- Led development of&#10;- Improved performance by&#10;- Managed team of"
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

      {/* Experience List */}
      <div className="space-y-4">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : experiences && experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <Card key={exp.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-xl font-semibold">{exp.company}</h3>
                    </div>
                    <p className="text-lg mb-2">{exp.role}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(exp.start_date).toLocaleDateString()} -{" "}
                          {exp.end_date
                            ? new Date(exp.end_date).toLocaleDateString()
                            : "Present"}
                        </span>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-1 mb-4">
                      {exp.bullets.map((bullet: string, i: number) => (
                        <li key={i} className="text-sm">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 flex-wrap">
                      {exp.skills.map((skill: string) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveDown(index)}
                      disabled={index === (experiences?.length || 0) - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(exp)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(exp.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No experience entries yet.</p>
              <p className="text-sm mt-2">
                Add your work experience to showcase your career journey.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Experience</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this experience entry? This action
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
