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
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProjects, getSkills } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Github,
  ExternalLink,
  Code,
  Briefcase,
  Award,
  Mail,
} from "lucide-react";

export default function HomePage() {
  const { data: featuredProjects, isLoading: projectsLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: getFeaturedProjects,
  });

  const { data: skills, isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  const skillsByCategory =
    skills?.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      },
      {} as Record<string, typeof skills>,
    ) || {};

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Full-Stack Developer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Building modern web applications with React, TypeScript, and Node.js.
          Passionate about creating exceptional user experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/projects">
              View My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/contact">
              <Mail className="mr-2 h-5 w-5" /> Get In Touch
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Button variant="ghost" asChild>
            <Link to="/projects">
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {projectsLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-6 w-3/4 mt-4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects?.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
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
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.slice(0, 3).map((tech: string) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Skills & Technologies</h2>
        {skillsLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                  <div className="space-y-2 mt-4">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsByCategory).map(
              ([category, categorySkills]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(categorySkills as any[]).map((skill: any) => (
                        <Badge key={skill.id} variant="outline">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        )}
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-3xl font-bold mb-8">More About Me</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Briefcase className="h-10 w-10 mb-4 text-primary" />
              <CardTitle>Experience</CardTitle>
              <CardDescription>
                View my professional work history and career journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="px-0" asChild>
                <Link to="/experience">
                  View Experience <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Award className="h-10 w-10 mb-4 text-primary" />
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                Check out my professional certifications and credentials.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="px-0" asChild>
                <Link to="/certifications">
                  View Certifications <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Code className="h-10 w-10 mb-4 text-primary" />
              <CardTitle>All Projects</CardTitle>
              <CardDescription>
                Browse through my complete portfolio of projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="px-0" asChild>
                <Link to="/projects">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Have a project in mind? I'd love to hear about it. Let's discuss how
          we can bring your ideas to life.
        </p>
        <Button size="lg" asChild>
          <Link to="/contact">
            <Mail className="mr-2 h-5 w-5" /> Get In Touch
          </Link>
        </Button>
      </section>
    </div>
  );
}
