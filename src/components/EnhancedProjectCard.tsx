import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { TechStackBadge } from './TechStackIcon';

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

export function EnhancedProjectCard({ project, index = 0 }: EnhancedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group hover-lift"
    >
      <Card className="overflow-hidden h-full glass hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
        <Link to={`/projects/${project.slug}`} className="block">
              {/* Project Image */}
              {project.cover_image_url ? (
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <motion.img
                    src={project.cover_image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/30">{project.title[0]}</span>
                </div>
              )}
            </Link>

            <CardHeader>
              <CardTitle className="group-hover:text-primary transition-colors">
                <Link to={`/projects/${project.slug}`} className="flex items-center justify-between">
                  {project.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-2">{project.summary}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((tech) => (
                  <TechStackBadge key={tech} tech={tech} />
                ))}
                {project.stack.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.stack.length - 4}
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {project.live_url && (
                  <Button size="sm" asChild className="flex-1">
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn"
                    >
                      <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.repo_url && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn"
                    >
                      <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>

              {/* Hover Reveal Details */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileHover={{ height: 'auto', opacity: 1 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-muted-foreground pt-2 border-t">
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
          <Card key={i} className="overflow-hidden h-full">
            <div className="aspect-video bg-muted animate-pulse" />
            <CardHeader>
              <div className="h-6 bg-muted animate-pulse rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="h-8 bg-muted animate-pulse rounded flex-1" />
                <div className="h-8 bg-muted animate-pulse rounded w-20" />
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
