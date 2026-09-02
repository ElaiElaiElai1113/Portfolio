import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProjects } from "@/services";
import { UniqueHero } from "@/components/UniqueHero";
import { UniqueProjectGrid } from "@/components/UniqueProjectCard";
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
        description="Full-stack product developer building production web, mobile, commerce, rewards, and business systems from customer experience through reliable operations."
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
                Shipped Systems
              </p>
              <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-semibold">
                Commercial products, built end to end
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Customer-facing experiences and operational platforms spanning automotive,
                commerce, rewards, and business networks.
              </p>
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
                description: "Independent client delivery",
                details: "Client product work since March 2026",
                href: "/experience",
                color: "text-terracotta",
              },
              {
                icon: Award,
                title: "Certifications",
                description: "Credentials and continuous learning",
                details: "Lean Six Sigma + DICT learning",
                href: "/certifications",
                color: "text-sage",
              },
              {
                icon: Code,
                title: "All Projects",
                description: "The complete portfolio",
                details: "10 case studies across live products and technical builds",
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
