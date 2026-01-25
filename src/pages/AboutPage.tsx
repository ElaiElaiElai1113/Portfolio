import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animations/PageTransition";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Award,
  Target,
  Lightbulb,
  Heart,
  Zap,
  Code,
  Users,
  TrendingUp,
  BookOpen,
  MapPin,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Me"
        description="Get to know Elijah N. De Los Santos - BS Information Systems student, Full-Stack Developer, and Agile Project Manager from Davao City, Philippines."
      />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover my journey, passions, and what drives me as a developer
              and project manager.
            </p>
          </div>
        </ScrollReveal>

        {/* Introduction */}
        <ScrollReveal delay={0.1}>
          <Card className="border-primary/20">
            <CardContent className="pt-8">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-lg leading-relaxed mb-4">
                  Hi, I'm <strong>Elijah N. De Los Santos</strong>, a BS
                  Information Systems student at Ateneo de Davao University,
                  Full-Stack Developer, and aspiring Project Manager based in{" "}
                  <strong>Davao City, Philippines</strong>.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  I'm passionate about building technology that matters while
                  leading teams to deliver exceptional results. What sets me
                  apart is my unique combination of technical expertise and
                  project management skills. I don't just write code, I
                  orchestrate successful software projects from conception to
                  deployment.
                </p>
                <p className="text-lg leading-relaxed">
                  As a <strong>Dean's Lister and President's Lister</strong>,
                  I've maintained academic excellence while gaining hands-on
                  experience leading real-world projects. I thrive in fast-paced
                  environments and excel at coordinating cross-functional teams
                  to deliver quality software on tight deadlines.
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* My Journey */}
        <ScrollReveal delay={0.2}>
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              My Journey
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div whileHover={{ y: -4 }}>
                <Card className="h-full border-border/50 hover:border-border transition-all">
                  <CardHeader>
                    <GraduationCap className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">
                        BS Information Systems
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Ateneo de Davao University
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Expected Graduation: 2026
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Dean's Lister</Badge>
                      <Badge variant="secondary">President's Lister</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -4 }}>
                <Card className="h-full border-border/50 hover:border-border transition-all">
                  <CardHeader>
                    <Award className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                        Yellow Belt
                      </Badge>
                      <span className="text-sm">Lean Six Sigma</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                        Enrolled
                      </Badge>
                      <span className="text-sm">Agile Project Management</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* What Drives Me */}
        <ScrollReveal delay={0.3}>
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Zap className="h-8 w-8 text-primary" />
              What Drives Me
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Code,
                  title: "Continuous Learning",
                  description:
                    "I type at 100+ WPM and am always eager to learn new technologies. From Flutter to React, from Agile to Lean Six Sigma, I embrace growth.",
                  color: "text-blue-500",
                },
                {
                  icon: Users,
                  title: "Collaborative Leadership",
                  description:
                    "I believe in the power of teams. Whether leading sprints or coordinating multiple teams, I foster communication and collaboration to achieve shared goals.",
                  color: "text-purple-500",
                },
                {
                  icon: Target,
                  title: "Results-Driven",
                  description:
                    "I focus on delivering tangible outcomes. Like deploying the Duyog Website in just one month, I thrive under pressure and deliver on commitments.",
                  color: "text-pink-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-border/50 hover:border-border transition-all hover:shadow-lg">
                    <CardHeader>
                      <item.icon className={`h-8 w-8 mb-2 ${item.color}`} />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Skills & Expertise */}
        <ScrollReveal delay={0.4}>
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-primary" />
              My Unique Edge
            </h2>
            <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/20">
              <CardContent className="pt-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      Developer + Project Manager
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Most developers focus only on code. I bring something
                      extra to the table:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Agile/Scrum expertise for structured development",
                        "Requirements gathering and stakeholder management",
                        "Team coordination and cross-functional leadership",
                        "Process optimization (Lean Six Sigma certified)",
                        "Documentation and workflow organization",
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <span className="text-primary mt-0.5">✓</span>
                          <span className="text-sm">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      Technical Versatility
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      I work across the full stack with modern technologies:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Node.js",
                        "Flutter",
                        "Dart",
                        "Python",
                        "SQL",
                        "TypeScript",
                        "HTML/CSS",
                        "PostgreSQL",
                        "Git/GitHub",
                        "Figma",
                        "Trello",
                        "Asana",
                      ].map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="hover:bg-primary/10 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* Beyond Code */}
        <ScrollReveal delay={0.5}>
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              Beyond Code
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/50">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    When I'm not coding or managing projects, you can find me
                    exploring the latest tech trends, learning about startup
                    culture, or diving into productivity and personal
                    development content. I'm particularly interested in how
                    technology can solve real-world problems in the Philippines
                    and beyond.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <MapPin className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Location & Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3">
                    Based in <strong>Davao City, Philippines</strong>, I'm open
                    to:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Full-time opportunities
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Freelance projects
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Remote collaborations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Startup ventures
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal delay={0.6}>
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border-border/50">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
            <div className="relative z-10 text-center py-12 px-4">
              <h3 className="text-2xl font-bold mb-3">
                Let's Connect and Build Something Amazing
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Whether you're looking for a developer, a project manager, or
                someone who can do both, I'd love to chat about opportunities
                and collaborations.
              </p>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </>
  );
}
