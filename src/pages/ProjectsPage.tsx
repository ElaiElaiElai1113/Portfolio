import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getPublishedProjects } from "@/services";
import { Github, ExternalLink, Search } from "lucide-react";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getPublishedProjects,
  });

  const filteredProjects = projects?.filter((project) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.summary.toLowerCase().includes(searchLower) ||
      project.stack.some((tech: string) =>
        tech.toLowerCase().includes(searchLower),
      ) ||
      project.tags.some((tag: string) =>
        tag.toLowerCase().includes(searchLower),
      )
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-muted-foreground">
          A collection of my work showcasing my skills and passion for building
          great products.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search projects by title, tech stack, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results count */}
      {searchTerm && (
        <p className="text-sm text-muted-foreground">
          {filteredProjects?.length} project
          {filteredProjects?.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4 mt-4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : filteredProjects && filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              {project.cover_image_url && (
                <div className="aspect-video w-full bg-muted">
                  <img
                    src={project.cover_image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="line-clamp-1">
                    {project.title}
                  </CardTitle>
                  {project.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-3">
                  {project.summary}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.slice(0, 4).map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                  {project.stack.length > 4 && (
                    <Badge variant="secondary">
                      +{project.stack.length - 4}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {project.live_url && (
                    <Button size="sm" asChild>
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                  {project.repo_url && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" asChild className="ml-auto">
                    <Link to={`/projects/${project.slug}`}>
                      Details <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            {searchTerm
              ? "No projects found matching your search."
              : "No projects yet."}
          </p>
        </div>
      )}
    </div>
  );
}
