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
  MapPin,
  Github,
  Linkedin,
  X,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  FadeInUp,
  StaggerContainer,
} from "@/components/animations/PageTransition";
import { TypingEffect } from "@/components/animations/TypingEffect";
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
        <section className="relative min-h-[80vh] flex items-center py-20">
          <HeroGradient />

          <StaggerContainer className="relative z-10 w-full px-4">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="text-center lg:text-left">
                <FadeInUp>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
                    <MapPin className="h-4 w-4" />
                    <span>Available for opportunities</span>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.1}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                      Hi, I'm Elijah
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                        Open to Work
                      </span>
                    </div>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.2} className="min-h-[80px] sm:min-h-[64px] mb-6">
                  <h2 className="text-4xl sm:text-6xl font-bold text-gradient-primary animate-gradient">
                    <TypingEffect
                      words={[
                        "Full-Stack Developer",
                        "Flutter Developer",
                        "Aspiring Project Manager",
                        "Agile Leader",
                        "Problem Solver",
                      ]}
                      speed={100}
                      deleteSpeed={50}
                      pauseDuration={2000}
                      className="inline-block"
                    />
                  </h2>
                </FadeInUp>

                <FadeInUp delay={0.3}>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 text-balance">
                    BS Information Systems student | Lean Six Sigma certified |
                    Results-driven developer with hands-on experience leading Agile
                    software projects and coordinating cross-functional teams
                  </p>
                </FadeInUp>

                <FadeInUp delay={0.4}>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                    <Button size="lg" asChild className="group rounded-full px-8 shadow-elevation-3">
                      <Link to="/projects">
                        View My Work
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>

                    <ResumeDownloadButton variant="outline" size="lg" className="rounded-full px-8" />
                  </div>
                </FadeInUp>

                {/* Social Links */}
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
                        className="p-3 rounded-full glass hover:shadow-glow transition-all text-muted-foreground hover:text-primary inline-block"
                        whileHover={{ scale: 1.15, rotate: 5 }}
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
                <Card className="surface-card relative overflow-hidden border-primary/20">
                  <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-[50px]" />
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Impact
                    </div>
                    <CardTitle className="text-3xl">Building products that solve real problems.</CardTitle>
                    <CardDescription className="text-base">
                      Dean's Lister | Lean Six Sigma Certified | Building scalable apps since 2022
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-primary/5">
                        <div className="text-2xl font-bold text-primary">6+</div>
                        <div className="text-xs text-muted-foreground">Production Apps</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-primary/5">
                        <div className="text-2xl font-bold text-primary">500+</div>
                        <div className="text-xs text-muted-foreground">GitHub Commits</div>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {[
                        "Full-stack applications with React & Node.js",
                        "Cross-platform mobile apps with Flutter",
                        "AI-powered tools with RAG & LLMs",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
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
