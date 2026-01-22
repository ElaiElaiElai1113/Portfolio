import { useQuery } from "@tanstack/react-query";
import {
  adminListProjects,
  adminListExperiences,
  adminListCertifications,
  adminListMessages,
} from "@/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FolderOpen,
  Briefcase,
  Award,
  MessageSquare,
  Plus,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: adminListProjects,
  });

  const { data: experiences, isLoading: experiencesLoading } = useQuery({
    queryKey: ["admin", "experiences"],
    queryFn: adminListExperiences,
  });

  const { data: certifications, isLoading: certificationsLoading } = useQuery({
    queryKey: ["admin", "certifications"],
    queryFn: adminListCertifications,
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: adminListMessages,
  });

  const publishedProjects =
    projects?.filter((p) => p.status === "published").length || 0;
  const draftProjects =
    projects?.filter((p) => p.status === "draft").length || 0;
  const featuredProjects = projects?.filter((p) => p.featured).length || 0;
  const unreadMessages =
    messages?.filter((m) => m.status === "new").length || 0;

  const stats = [
    {
      title: "Total Projects",
      value: projects?.length || 0,
      description: `${publishedProjects} published, ${draftProjects} draft`,
      icon: FolderOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      href: "/admin/projects",
    },
    {
      title: "Featured Projects",
      value: featuredProjects,
      description: "Projects featured on homepage",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      href: "/admin/projects",
    },
    {
      title: "Experience",
      value: experiences?.length || 0,
      description: "Work experience entries",
      icon: Briefcase,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      href: "/admin/experience",
    },
    {
      title: "Certifications",
      value: certifications?.length || 0,
      description: "Professional certifications",
      icon: Award,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      href: "/admin/certifications",
    },
    {
      title: "New Messages",
      value: unreadMessages,
      description: "Unread contact form messages",
      icon: MessageSquare,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      href: "/admin/messages",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your portfolio.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} to={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.bgColor} p-2 rounded-lg`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  {projectsLoading ||
                  experiencesLoading ||
                  certificationsLoading ||
                  messagesLoading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <>
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="justify-start h-auto py-4"
              asChild
            >
              <Link to="/admin/projects/new">
                <FolderOpen className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">New Project</div>
                  <div className="text-xs text-muted-foreground">
                    Add a new project
                  </div>
                </div>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto py-4"
              asChild
            >
              <Link to="/admin/experience">
                <Briefcase className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Manage Experience</div>
                  <div className="text-xs text-muted-foreground">
                    Edit work history
                  </div>
                </div>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto py-4"
              asChild
            >
              <Link to="/admin/messages">
                <MessageSquare className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">View Messages</div>
                  <div className="text-xs text-muted-foreground">
                    {unreadMessages > 0 && `${unreadMessages} unread`}
                  </div>
                </div>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto py-4"
              asChild
            >
              <Link to="/" target="_blank">
                <ArrowUpRight className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">View Public Site</div>
                  <div className="text-xs text-muted-foreground">
                    Open in new tab
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Latest updates to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          {projectsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                    <FolderOpen className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="font-medium hover:underline truncate"
                      >
                        {project.title}
                      </Link>
                      <Badge
                        variant={
                          project.status === "published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      Updated{" "}
                      {new Date(project.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/admin/projects/${project.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No projects yet. Create your first project!</p>
              <Button variant="link" asChild className="mt-2">
                <Link to="/admin/projects/new">Create Project</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
