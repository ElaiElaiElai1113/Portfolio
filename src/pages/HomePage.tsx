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
  Code,
  Briefcase,
  Award,
  Mail,
  Github,
  Linkedin,
  X,
  Sparkles,
  Dot,
} from "lucide-react";
import {
  FadeInUp,
  StaggerContainer,
} from "@/components/animations/PageTransition";
import { HeroGradient } from "@/components/animations/GradientBackground";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { EnhancedProjectCard } from "@/components/EnhancedProjectCard";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { CircularSkill } from "@/components/SkillsVisualization";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: featuredProjects, isLoading: projectsLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: getFeaturedProjects,
  });

  const { data: skills, isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  const topSkills =
    skills
      ?.filter(
        (s) => s.proficiency === "Expert" || s.proficiency === "Advanced",
      )
      .slice(0, 6) || [];

  return (
    <>
      <SEO
        title="Home"
        description="Elijah N. De Los Santos - BS Information Systems student, Full-Stack Developer, and Agile Project Manager. Specializing in React, Node.js, Flutter, and leading cross-functional teams."
      />

      <div className="space-y-24">
        {/* Hero Section */}
        <section className="relative flex min-h-[80vh] items-center py-20">
          <HeroGradient />

          <StaggerContainer className="relative z-10 w-full px-4">
            <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="text-center lg:text-left">
                <FadeInUp>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-foreground/78">
                    <span className="relative inline-flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                    Available for full-stack roles and freelance builds
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.1}>
                  <div className="mb-6">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-primary/80">
                      Elijah De Los Santos
                    </p>
                    <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-white sm:text-7xl">
                      Hi, I'm Elijah
                    </h1>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.2} className="mb-6">
                  <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl">
                    I engineer scalable, high-performance web applications.
                  </h2>
                </FadeInUp>

                <FadeInUp delay={0.3}>
                  <p className="mb-10 max-w-2xl text-lg text-muted-foreground/95 sm:text-xl">
                    Full-stack developer with a systems mindset. I build performant
                    products, shape reliable front-end architecture, and turn complex
                    requirements into clean user experiences that feel considered.
                  </p>
                </FadeInUp>

                <FadeInUp delay={0.4}>
                  <div className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                    <Button size="lg" asChild className="group rounded-full px-8 shadow-elevation-3">
                      <Link to="/projects">
                        View My Work
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>

                    <ResumeDownloadButton variant="outline" size="lg" className="rounded-full px-8" />
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.5}>
                  <div className="flex justify-center lg:justify-start gap-4">
                    {[
                      { icon: Github, href: "https://github.com", label: "GitHub" },
                      {
                        icon: Linkedin,
                        href: "https://linkedin.com",
                        label: "LinkedIn",
                      },
                      {
                        icon: X,
                        href: "https://twitter.com",
                        label: "X (Twitter)",
                      },
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full border border-white/8 bg-white/[0.03] p-3 text-muted-foreground transition-all hover:border-white/16 hover:bg-white/[0.05] hover:text-foreground"
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </FadeInUp>
              </div>

              <FadeInUp delay={0.35}>
                <Card className="surface-card relative overflow-hidden border-white/8">
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/12 blur-[60px]" />
                  <CardHeader className="space-y-5 p-8 sm:p-10">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Selected Focus
                    </div>
                    <CardTitle className="text-3xl tracking-[-0.03em] text-foreground">
                      Shipping products with strong systems thinking and clean execution.
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground/90">
                      Front-end engineering, full-stack delivery, and product-minded
                      implementation across SaaS, AI, and operational platforms.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8 pt-0 sm:p-10 sm:pt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Focus
                        </div>
                        <div className="mt-3 text-lg font-semibold text-foreground">
                          React, TypeScript, Tailwind
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Strength
                        </div>
                        <div className="mt-3 text-lg font-semibold text-foreground">
                          Product systems and delivery
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {[
                        "Designing scalable interfaces that stay fast under real product complexity.",
                        "Building end-to-end systems with clear architecture and maintainable code.",
                        "Translating business requirements into polished, conversion-aware experiences.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Dot className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeInUp>
            </div>
          </StaggerContainer>
        </section>

        {/* Featured Projects */}
        <section>
          <ScrollReveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">Portfolio</p>
                <h2 className="text-4xl font-bold mb-2">Featured Projects</h2>
                <p className="text-muted-foreground">Selected work that blends craft, performance, and outcomes.</p>
              </div>
              <Button variant="ghost" asChild className="group">
                <Link to="/projects">
                  View All
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {projectsLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden h-full">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 flex-1" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects?.map((project, index) => (
                <EnhancedProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </section>

        {/* Stats Section */}
        <ScrollReveal>
          <Card className="surface-card">
            <CardContent className="py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "6+", label: "Featured Projects" },
                  { value: "34", label: "Skills & Tools" },
                  { value: "2+", label: "Years Experience" },
                  { value: "100%", label: "Commitment" },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="text-5xl font-bold text-gradient-primary">
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Skills Showcase */}
        <section>
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">Core Skills</p>
              <h2 className="text-4xl font-bold mb-2">Top Skills</h2>
              <p className="text-muted-foreground">
                Technologies I return to for scalable, reliable builds.
              </p>
            </div>
          </ScrollReveal>

          {skillsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="flex items-center justify-center p-8">
                  <Skeleton className="h-20 w-20 rounded-full" />
                </Card>
              ))}
            </div>
          ) : (
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {topSkills.map((skill) => (
                  <CircularSkill key={skill.id} skill={skill} />
                ))}
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.3} className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/projects">
                View All Skills <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </section>

        {/* Quick Links */}
        <section>
          <ScrollReveal>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">Discover</p>
              <h2 className="text-4xl font-bold mb-12 text-center">
                More About Me
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: "Experience",
                description: "2+ years building production applications",
                details: "Professional journey & growth",
                href: "/experience",
                color: "text-blue-500",
                stat: "2 Years",
              },
              {
                icon: Award,
                title: "Certifications",
                description: "Lean Six Sigma & Agile certified",
                details: "Professional credentials",
                href: "/certifications",
                color: "text-purple-500",
                stat: "3+ Certs",
              },
              {
                icon: Code,
                title: "All Projects",
                description: "6 featured projects to explore",
                details: "Full portfolio showcase",
                href: "/projects",
                color: "text-pink-500",
                stat: "6 Projects",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.href} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="hover-lift"
                >
                  <Card className="h-full surface-ring glass-strong hover:shadow-glow transition-all cursor-pointer">
                    <Link to={item.href}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <item.icon className={`h-12 w-12 mb-4 ${item.color}`} />
                          {item.stat && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {item.stat}
                            </Badge>
                          )}
                        </div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        <p className="text-xs text-muted-foreground mt-2">{item.details}</p>
                      </CardHeader>
                      <CardContent>
                        <Button variant="link" className="px-0 group">
                          View {item.title}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <ScrollReveal>
            <Card className="relative overflow-hidden surface-card shadow-glow">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#fb923c26,transparent_60%)]" />
              <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:24px_24px]" />
              <div className="relative z-10 text-center py-16 px-4">
                <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">Let's Collaborate</p>
                <h2 className="text-4xl font-bold mb-4">Let's build something amazing together.</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  I'm always excited to work on meaningful projects. Whether you need a full-stack application,
                  mobile app, or technical consultation—let's discuss how I can help bring your vision to life.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild className="group rounded-full px-8 shadow-elevation-3">
                    <Link to="/contact">
                      <Mail className="mr-2 h-5 w-5" /> Start a Conversation
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <ResumeDownloadButton variant="outline" size="lg" className="rounded-full px-8" />
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Usually responds within 24 hours
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
