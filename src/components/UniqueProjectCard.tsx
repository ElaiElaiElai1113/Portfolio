import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

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

interface UniqueProjectCardProps {
  project: Project;
  index?: number;
}

export function UniqueProjectCard({ project, index = 0 }: UniqueProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group"
    >
      <article className="relative surface-paper p-6 hover-organic transition-all duration-300">
          {/* Header with organic layout */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-['Playfair_Display'] font-semibold group-hover:text-primary transition-colors">
                  <Link to={`/projects/${project.slug}`} className="hover:text-primary transition-colors">
                    {project.title}
                  </Link>
                </h3>
                {project.featured && (
                  <span className="text-xs text-primary/70">Featured</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.summary}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>

          {/* Project image - unique presentation */}
          {project.cover_image_url && (
            <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden">
              <Link to={`/projects/${project.slug}`} className="block aspect-video bg-muted/50">
                <motion.img
                  src={project.cover_image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </Link>
              {/* Unique overlay pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <pattern
                    id="grid-pattern"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-foreground/10"
                    />
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid-pattern)" />
                </svg>
              </div>
            </div>
          )}

          {/* Tech stack - unique badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-md border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-3 py-1 text-xs font-medium rounded-md border border-border/30 text-muted-foreground">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Action links - distinctive style */}
          <div className="flex items-center gap-4 pt-4 border-t border-border/50">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group/link"
              >
                <span>Live Demo</span>
                <ExternalLink className="h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group/link"
              >
                <span>Source</span>
                <Github className="h-4 w-4 group-hover/link:rotate-12 transition-transform" />
              </a>
            )}
          </div>

          {/* Decorative element */}
          <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
      </article>
    </motion.div>
  );
}

interface UniqueProjectGridProps {
  projects: Project[];
  loading?: boolean;
}

export function UniqueProjectGrid({ projects, loading }: UniqueProjectGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="surface-paper p-6 animate-pulse">
            <div className="h-6 bg-muted/50 rounded mb-4 w-3/4" />
            <div className="h-4 bg-muted/30 rounded mb-2 w-full" />
            <div className="h-4 bg-muted/30 rounded mb-6 w-2/3" />
            <div className="aspect-video bg-muted/30 rounded mb-4" />
            <div className="flex gap-2">
              <div className="h-8 bg-muted/30 rounded w-16" />
              <div className="h-8 bg-muted/30 rounded w-20" />
              <div className="h-8 bg-muted/30 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <UniqueProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
