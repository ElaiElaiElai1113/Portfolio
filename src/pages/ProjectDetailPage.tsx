import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug, getProjectMedia } from "@/services";
import { ArrowLeft, Github, ExternalLink, Play } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug!),
    enabled: !!slug,
  });

  const { data: media } = useQuery({
    queryKey: ["project-media", project?.id],
    queryFn: () => getProjectMedia(project!.id),
    enabled: !!project?.id,
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <Link to="/projects">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link to="/projects">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <Link to="/projects">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </Link>

      {/* Hero */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            {project.featured && <Badge variant="default">Featured</Badge>}
            <Badge variant="secondary">{project.status}</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.summary}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {project.live_url && (
            <Button size="lg" asChild>
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
              </a>
            </Button>
          )}
          {project.repo_url && (
            <Button size="lg" variant="outline" asChild>
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" /> GitHub Repository
              </a>
            </Button>
          )}
          {project.demo_video_url && (
            <Button size="lg" variant="outline" asChild>
              <a
                href={project.demo_video_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="mr-2 h-5 w-5" /> Watch Demo
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Cover Image */}
      {project.cover_image_url && (
        <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Tech Stack */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech: string) => (
            <Badge key={tech} variant="outline" className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {project.case_study_md && (
            <TabsTrigger value="case-study">Case Study</TabsTrigger>
          )}
          {media && media.length > 0 && (
            <TabsTrigger value="gallery">Media Gallery</TabsTrigger>
          )}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {project.role && (
                <div>
                  <h3 className="font-semibold mb-2">Role</h3>
                  <p className="text-muted-foreground">{project.role}</p>
                </div>
              )}
              {project.problem && (
                <div>
                  <h3 className="font-semibold mb-2">Problem</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div>
                  <h3 className="font-semibold mb-2">Solution</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {project.solution}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Case Study Tab */}
        {project.case_study_md && (
          <TabsContent value="case-study" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <ReactMarkdown>{project.case_study_md}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Media Gallery Tab */}
        {media && media.length > 0 && (
          <TabsContent value="gallery" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {media.map((item) => (
                <Card key={item.id}>
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.caption || "Project image"}
                      className="w-full aspect-video object-cover rounded-t-lg"
                    />
                  ) : (
                    <video
                      src={item.url}
                      controls
                      className="w-full aspect-video rounded-t-lg"
                    />
                  )}
                  {item.caption && (
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground">
                        {item.caption}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
