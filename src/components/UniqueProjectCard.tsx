import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getProjectActions, getProjectStateLabel } from "@/lib/projectPresentation";
import type { Project } from "@/types/portfolio";

interface UniqueProjectCardProps {
  project: Project;
  index?: number;
}

export function UniqueProjectCard({ project, index = 0 }: UniqueProjectCardProps) {
  const actions = getProjectActions(project);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.08, 0.32),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group surface-paper flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_22px_70px_-36px_hsl(var(--primary)/0.45)]"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden border-b border-border/50 bg-muted/30"
        aria-label={`View ${project.title} case study`}
      >
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ProjectVisual
            src={project.cover_image_url}
            alt={`${project.title} product preview`}
            className="h-full w-full object-cover object-top"
            loading={index < 2 ? "eager" : "lazy"}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/72 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-background/75 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground backdrop-blur-md">
          {getProjectStateLabel(project.project_state)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          {project.category} <span aria-hidden="true">·</span> {project.year}
        </p>

        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="font-['Playfair_Display'] text-2xl font-semibold leading-tight sm:text-[1.7rem]">
            <Link
              to={`/projects/${project.slug}`}
              className="transition-colors hover:text-primary"
            >
              {project.title}
            </Link>
          </h3>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
        </div>

        <p className="mb-5 text-sm leading-6 text-muted-foreground sm:text-[0.95rem]">
          {project.summary}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border/70 bg-muted/25 px-3 py-1 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border/60 pt-5">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            View Case Study
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          {actions.map((action) => (
            <a
              key={`${action.kind}-${action.url}`}
              href={action.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {action.kind === "live" ? (
                <ExternalLink className="h-3.5 w-3.5" />
              ) : (
                <Github className="h-3.5 w-3.5" />
              )}
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

interface UniqueProjectGridProps {
  projects: Project[];
  loading?: boolean;
}

export function UniqueProjectGrid({ projects, loading }: UniqueProjectGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-12">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            key={item}
            className={`surface-paper overflow-hidden ${
              index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-4"
            }`}
          >
            <div className="aspect-[16/10] animate-pulse bg-muted/35" />
            <div className="space-y-4 p-7">
              <div className="h-3 w-1/3 animate-pulse rounded bg-muted/35" />
              <div className="h-7 w-2/3 animate-pulse rounded bg-muted/45" />
              <div className="h-16 animate-pulse rounded bg-muted/25" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={
            index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-4"
          }
        >
          <UniqueProjectCard project={project} index={index} />
        </div>
      ))}
    </div>
  );
}
