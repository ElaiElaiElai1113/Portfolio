import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getPublishedProjects } from "@/services";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/PageTransition";
import { ProjectGrid } from "@/components/EnhancedProjectCard";
import { SEO } from "@/components/SEO";

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
      )
    );
  });

  // Get unique technologies for filter
  const allTechnologies = projects?.flatMap((p) => p.stack) || [];
  const uniqueTechs = Array.from(new Set(allTechnologies)).sort();

  return (
    <>
      <SEO
        title="Projects"
        description="Explore my portfolio of projects showcasing full-stack development skills with React, TypeScript, Node.js, and more."
      />

      <div className="space-y-12">
        {/* Header */}
        <ScrollReveal>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A collection of my work showcasing my skills and passion for building
              great products. Each project demonstrates different aspects of my
              full-stack development expertise.
            </p>
          </div>
        </ScrollReveal>

        {/* Search and Filter */}
        <ScrollReveal delay={0.1}>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects by title, tech stack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Tech Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground"
                whileHover={{ x: 2 }}
              >
                <Filter className="h-4 w-4" />
                <span>Quick filter:</span>
              </motion.div>
              {uniqueTechs.slice(0, 10).map((tech) => (
                <motion.button
                  key={tech}
                  onClick={() => setSearchTerm(tech)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    searchTerm === tech
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted border-border"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.button>
              ))}
              {uniqueTechs.length > 10 && (
                <Badge variant="secondary">+{uniqueTechs.length - 10} more</Badge>
              )}
            </div>

            {/* Results count */}
            {searchTerm && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground"
              >
                {filteredProjects?.length} project
                {filteredProjects?.length !== 1 ? "s" : ""} found for "{searchTerm}"
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 text-primary hover:underline"
                  >
                    Clear
                  </button>
                )}
              </motion.p>
            )}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <ScrollReveal delay={0.2}>
          {isLoading ? (
            <ProjectGrid loading={true} projects={[]} />
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <ProjectGrid projects={filteredProjects} loading={false} />
          ) : (
            <div className="text-center py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">
                  {searchTerm ? "No projects found" : "No projects yet"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm
                    ? `No projects match "${searchTerm}". Try a different search term.`
                    : "Check back soon for new projects!"}
                </p>
                {searchTerm && (
                  <Button onClick={() => setSearchTerm("")}>Clear search</Button>
                )}
              </motion.div>
            </div>
          )}
        </ScrollReveal>

        {/* CTA */}
        {!searchTerm && filteredProjects && filteredProjects.length > 0 && (
          <ScrollReveal delay={0.3}>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Interested in working together?
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </>
  );
}
