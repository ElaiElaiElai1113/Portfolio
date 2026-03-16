import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { TechStackBadge } from "./TechStackIcon";

interface Project {
  id: string;
  title: string;
  summary: string;
  description?: string;
  cover_image_url?: string;
  stack: string[];
  live_url?: string;
  repo_url?: string;
  featured?: boolean;
  featured_order?: number;
  slug: string;
}

interface EnhancedProjectCardProps {
  project: Project;
  index?: number;
}

const placeholderStyle = {
  backgroundImage: [
    "radial-gradient(circle at 18% 22%, rgba(148, 163, 184, 0.2), transparent 30%)",
    "radial-gradient(circle at 78% 28%, rgba(125, 211, 252, 0.14), transparent 28%)",
    "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))",
  ].join(", "),
};

export function EnhancedProjectCard({
  project,
  index = 0,
}: EnhancedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.03, 0.15),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group"
      style={{ willChange: "transform, opacity" }}
    >
      <Card className="relative h-full overflow-hidden border-white/8 bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-white/12 hover:shadow-glow">
        {project.featured && (
          <div className="absolute right-3 top-3 z-10">
            <Badge className="border-white/10 bg-background/70 text-foreground backdrop-blur-md hover:bg-background/80">
              Featured
            </Badge>
          </div>
        )}

        <Link to={`/projects/${project.slug}`} className="block">
          {project.cover_image_url ? (
            <div className="relative aspect-[16/10] overflow-hidden border-b border-white/6 bg-muted/30">
              <motion.img
                src={project.cover_image_url}
                alt={project.title}
                className="h-full w-full object-cover object-top"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/72 via-background/8 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
            </div>
          ) : (
            <div
              className="relative aspect-[16/10] overflow-hidden border-b border-white/6 bg-[#11131a]"
              style={placeholderStyle}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          )}
        </Link>

        <CardHeader className="space-y-3 p-6">
          <CardTitle className="transition-colors group-hover:text-primary">
            <Link
              to={`/projects/${project.slug}`}
              className="flex items-center justify-between gap-3"
            >
              {project.title}
              <ArrowRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm leading-6 text-muted-foreground/90">
            {project.summary}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 p-6 pt-0">
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

          <div className="flex gap-2">
            {project.live_url && (
              <Button size="sm" asChild className="flex-1 rounded-full">
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn"
                >
                  <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.repo_url && (
              <Button
                size="sm"
                variant="outline"
                asChild
                className="rounded-full border-white/10 bg-transparent"
              >
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn"
                >
                  <Github className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                  GitHub
                </a>
              </Button>
            )}
          </div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            whileHover={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
          >
            <p className="border-t border-white/6 pt-3 text-sm text-muted-foreground">
              Click to view project details
            </p>
          </motion.div>
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
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="h-full overflow-hidden border-white/8 bg-white/[0.025]">
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
