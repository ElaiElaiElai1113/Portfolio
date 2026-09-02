import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ProjectVisual } from "@/components/ProjectVisual";
import { TechStackBadge } from "@/components/TechStackIcon";
import { getProjectActions, getProjectStateLabel } from "@/lib/projectPresentation";
import type { Project } from "@/types/portfolio";

interface EnhancedProjectCardProps {
  project: Project;
  index?: number;
}

export function EnhancedProjectCard({ project, index = 0 }: EnhancedProjectCardProps) {
  const actions = getProjectActions(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.03, 0.15),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group h-full"
    >
      <Card className="relative flex h-full flex-col overflow-hidden border-white/8 bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-glow">
        <Link
          to={`/projects/${project.slug}`}
          className="relative block aspect-[16/10] overflow-hidden border-b border-white/6 bg-muted/30"
          aria-label={`View ${project.title} case study`}
        >
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.4 }}
          >
            <ProjectVisual
              src={project.cover_image_url}
              alt={`${project.title} product preview`}
              className="h-full w-full object-cover object-top"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
          <Badge className="absolute left-4 top-4 border-white/10 bg-background/75 text-foreground backdrop-blur-md hover:bg-background/80">
            {getProjectStateLabel(project.project_state)}
          </Badge>
        </Link>

        <CardHeader className="space-y-3 p-6 pb-4">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {project.category} <span aria-hidden="true">·</span> {project.year}
          </p>
          <h2 className="text-2xl font-semibold leading-none tracking-tight transition-colors group-hover:text-primary">
            <Link
              to={`/projects/${project.slug}`}
              className="flex items-center justify-between gap-3"
            >
              {project.title}
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </h2>
          <CardDescription className="line-clamp-3 text-sm leading-6 text-muted-foreground/90">
            {project.summary}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col space-y-5 p-6 pt-0">
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <TechStackBadge key={tech} tech={tech} />
            ))}
            {project.stack.length > 4 && (
              <Badge
                variant="secondary"
                className="border-white/8 bg-white/[0.03] text-xs text-muted-foreground"
              >
                +{project.stack.length - 4}
              </Badge>
            )}
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            <Button size="sm" asChild className="rounded-full">
              <Link to={`/projects/${project.slug}`}>
                View Case Study
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {actions.map((action) => (
              <Button
                key={`${action.kind}-${action.url}`}
                size="sm"
                variant="outline"
                asChild
                className="rounded-full border-white/10 bg-transparent"
              >
                <a href={action.url} target="_blank" rel="noopener noreferrer">
                  {action.kind === "live" ? (
                    <ExternalLink className="mr-2 h-4 w-4" />
                  ) : (
                    <Github className="mr-2 h-4 w-4" />
                  )}
                  {action.label}
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ProjectGridProps {
  projects: Project[];
  loading?: boolean;
}

export function ProjectGrid({ projects, loading }: ProjectGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} className="h-full overflow-hidden border-white/8 bg-white/[0.025]">
            <div className="aspect-[16/10] animate-pulse bg-muted/40" />
            <CardHeader className="p-6">
              <div className="mb-2 h-6 w-3/4 rounded bg-muted/50" />
              <div className="h-4 w-full rounded bg-muted/40" />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex gap-2">
                <div className="h-8 flex-1 rounded-full bg-muted/40" />
                <div className="h-8 w-20 rounded-full bg-muted/40" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <EnhancedProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
