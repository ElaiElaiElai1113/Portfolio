import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Twitter,
} from "lucide-react";
import { FadeInUp, StaggerContainer } from "@/components/animations/PageTransition";
import { TypingEffect } from "@/components/animations/TypingEffect";
import { HeroGradient } from "@/components/animations/GradientBackground";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { EnhancedProjectCard } from "@/components/EnhancedProjectCard";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { CircularSkill } from "@/components/SkillsVisualization";
import { CompactSocialProof } from "@/components/SocialProof";
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

  const topSkills = skills?.filter(s => s.proficiency === 'Expert' || s.proficiency === 'Advanced').slice(0, 6) || [];

  return (
    <>
      <SEO
        title="Home"
        description="Full-Stack Developer specializing in React, TypeScript, and Node.js. Building modern web applications with exceptional user experiences."
      />

      <div className="space-y-24">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center py-20 text-center">
          <HeroGradient />

          <StaggerContainer className="relative z-10 max-w-4xl mx-auto px-4">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
                <MapPin className="h-4 w-4" />
                <span>Available for opportunities</span>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
                Hi, I'm a
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.2} className="min-h-[80px] sm:min-h-[64px] mb-6">
              <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                <TypingEffect
                  words={[
                    "Full-Stack Developer",
                    "React Enthusiast",
                    "TypeScript Expert",
                    "UI/UX Lover",
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
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                I build modern web applications that are fast, accessible, and
                beautiful. Let's create something amazing together.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <MagneticButton strength={0.2}>
                  <Button size="lg" asChild className="group">
                    <Link to="/projects">
                      View My Work
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </MagneticButton>

                <MagneticButton strength={0.2}>
                  <ResumeDownloadButton variant="outline" size="lg" />
                </MagneticButton>
              </div>
            </FadeInUp>

            {/* Social Links */}
            <FadeInUp delay={0.5}>
              <div className="flex justify-center gap-4">
                {[
                  { icon: Github, href: 'https://github.com', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </FadeInUp>
          </StaggerContainer>
        </section>

        {/* Social Proof Banner */}
        <ScrollReveal>
          <CompactSocialProof />
        </ScrollReveal>

        {/* Featured Projects */}
        <section>
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2">Featured Projects</h2>
                <p className="text-muted-foreground">Some of my recent work</p>
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
                <EnhancedProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* Skills Showcase */}
        <section>
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-2">Top Skills</h2>
              <p className="text-muted-foreground">Technologies I work with most</p>
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
            <h2 className="text-4xl font-bold mb-12 text-center">More About Me</h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: 'Experience',
                description: 'View my professional work history and career journey.',
                href: '/experience',
                color: 'text-blue-500',
              },
              {
                icon: Award,
                title: 'Certifications',
                description: 'Check out my professional certifications and credentials.',
                href: '/certifications',
                color: 'text-purple-500',
              },
              {
                icon: Code,
                title: 'All Projects',
                description: 'Browse through my complete portfolio of projects.',
                href: '/projects',
                color: 'text-pink-500',
              },
            ].map((item, index) => (
              <ScrollReveal key={item.href} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all cursor-pointer border-border/50 hover:border-border">
                    <Link to={item.href}>
                      <CardHeader>
                        <item.icon className={`h-12 w-12 mb-4 ${item.color}`} />
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
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
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border-border/50">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
              <div className="relative z-10 text-center py-16 px-4">
                <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Have a project in mind? I'd love to hear about it. Let's discuss how
                  we can bring your ideas to life.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <MagneticButton strength={0.15}>
                    <Button size="lg" asChild className="group">
                      <Link to="/contact">
                        <Mail className="mr-2 h-5 w-5" /> Get In Touch
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </MagneticButton>
                  <MagneticButton strength={0.15}>
                    <ResumeDownloadButton variant="outline" size="lg" />
                  </MagneticButton>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
