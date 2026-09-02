import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getPublishedProjects } from "@/services";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/PageTransition";
import { ProjectGrid } from "@/components/EnhancedProjectCard";
import { SEO } from "@/components/SEO";
import {
  PROJECT_CATEGORIES,
  matchesProject,
  type ProjectCategoryFilter,
} from "@/lib/projectPresentation";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryFilter>("All");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getPublishedProjects,
  });

  const filteredProjects = projects?.filter((project) =>
    matchesProject(project, searchTerm, activeCategory),
  );

  const filtersActive = Boolean(searchTerm.trim()) || activeCategory !== "All";

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
  };

  return (
    <>
      <SEO
        title="Projects"
        description="Explore commercial products, client platforms, and technical builds across full-stack web, mobile, AI, commerce, and automation."
      />

      <div className="container mx-auto px-6 space-y-12">
        {/* Header */}
        <ScrollReveal>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Production products, client platforms, and technical builds across full-stack
              web, mobile, AI, and automation. Every entry is labeled by its real delivery
              state.
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
                placeholder="Search products, outcomes, or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
                aria-label="Search projects"
              />
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter projects by category"
            >
              {PROJECT_CATEGORIES.map((category) => (
                <motion.button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted border-border"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Results count */}
            {filtersActive && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground"
              >
                {filteredProjects?.length} project
                {filteredProjects?.length !== 1 ? "s" : ""} found
                {searchTerm.trim() ? ` for “${searchTerm.trim()}”` : ""}
                {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-2 text-primary hover:underline"
                >
                  Clear filters
                </button>
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
                  {filtersActive ? "No projects found" : "No projects yet"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {filtersActive
                    ? "No projects match these filters. Try another search or category."
                    : "Check back soon for new projects!"}
                </p>
                {filtersActive && (
                  <Button onClick={clearFilters}>Clear filters</Button>
                )}
              </motion.div>
            </div>
          )}
        </ScrollReveal>

        {/* CTA */}
        {!filtersActive && filteredProjects && filteredProjects.length > 0 && (
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
