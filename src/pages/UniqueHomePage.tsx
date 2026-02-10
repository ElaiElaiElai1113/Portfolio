import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProjects } from "@/services";
import { UniqueHero } from "@/components/UniqueHero";
import { UniqueProjectGrid } from "@/components/UniqueProjectCard";
import { AutomationShowcase } from "@/components/AutomationShowcase";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Award,
  Code,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UniqueHomePage() {
  const { data: featuredProjects, isLoading: projectsLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: getFeaturedProjects,
  });

  return (
    <>
      <SEO
        title="Elijah De Los Santos"
        description="Full-Stack Developer & Automation Architect building thoughtful digital products. Explore my projects, n8n workflows, and technical journey."
      />

      {/* Hero Section */}
      <UniqueHero />

      {/* Featured Projects */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Selected Work
              </p>
              <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-semibold">
                Projects I've built
              </h2>
            </div>
            <Button variant="ghost" asChild className="group">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <UniqueProjectGrid projects={featuredProjects || []} loading={projectsLoading} />
        </div>
      </section>

      {/* Automation Showcase */}
      <AutomationShowcase />

      {/* Quick Links - Distinctive Design */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Discover
            </p>
            <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-semibold">
              More about me
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: "Experience",
                description: "My professional journey and growth",
                details: "2+ years shipping web and mobile projects",
                href: "/experience",
                color: "text-terracotta",
              },
              {
                icon: Award,
                title: "Certifications",
                description: "Credentials and continuous learning",
                details: "Lean Six Sigma Yellow Belt + Agile training",
                href: "/certifications",
                color: "text-sage",
              },
              {
                icon: Code,
                title: "All Projects",
                description: "The complete portfolio",
                details: "6+ featured projects to explore",
                href: "/projects",
                color: "text-indigo",
              },
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={item.href}>
                  <Card className="surface-paper p-6 h-full hover-organic transition-all">
                    <item.icon className={`h-10 w-10 mb-4 ${item.color}`} />
                    <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mb-4">
                      {item.details}
                    </p>
                    <Button variant="link" className="px-0 group">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Authentic & Personal */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="surface-paper p-12 lg:p-16 text-center">
              <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-semibold mb-6">
                Let's work together
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                I'm looking for teams that value thoughtful execution. I can help
                with full-stack product development, workflow automation, and
                shipping reliable features from idea to deployment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="rounded-full px-8">
                  <Link to="/contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Start a Conversation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-8">
                  <Link to="/projects">
                    <Code className="mr-2 h-5 w-5" />
                    View My Work
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Based in Davao City, Philippines • Available for remote
                opportunities
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
}
