import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Award,
  MapPin,
  Mail,
  Github,
  Linkedin,
  BookOpen,
  Code,
  Users,
  Target,
  Heart,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

export default function UniqueAboutPage() {
  return (
    <>
      <SEO
        title="About"
        description="Elijah N. De Los Santos — full-stack product developer building customer experiences, operational platforms, and reliable data systems."
      />

      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Header */}
        <section className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">A bit about me</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-['Playfair_Display'] font-semibold">
              The story so far
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A practical snapshot of how I work and what I care about.
            </p>
          </motion.div>
        </section>

        {/* Introduction - Personal & Authentic */}
        <section>
          <Card className="surface-paper p-8 lg:p-12">
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <h2 className="text-3xl font-['Playfair_Display'] font-semibold">
                  Hi, I'm Elijah
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    I'm an independent Full-Stack Developer based in Davao City,
                    Philippines. I began paid client development in March 2026
                    and graduated with a BS in Information Systems from Ateneo
                    de Davao University in June 2026 while working.
                  </p>
                  <p>
                    I build production products that connect customer experience
                    with the operational systems behind it. My client work spans
                    automotive, rewards, commerce, and B2B platforms, and I have
                    owned the majority of those builds as the sole full-stack developer.
                  </p>
                  <p>
                    I care about clear requirements, dependable data, thoughtful
                    interfaces, and maintainable delivery. Clear communication
                    and documentation are part of the engineering work, not an
                    afterthought.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Davao City, Philippines</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>BS Information Systems · Graduated June 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="h-5 w-5 text-primary" />
                    <span>Lean Six Sigma Yellow Belt</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Dean's Lister
                  </Badge>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    President's Lister
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* What I Actually Do - Authentic descriptions */}
        <section>
          <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-8">
            What I actually do
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Code,
                title: "Build Full-Stack Applications",
                description:
                  "I create web applications using React, Node.js, and whatever tools fit the job. I care about performance, accessibility, and maintainability — not just shipping features.",
                color: "text-terracotta",
              },
              {
                icon: Target,
                title: "Automate Repetitive Work",
                description:
                  "Using n8n, I build workflows that remove repetitive manual tasks. Recent automations include invoice handling, onboarding flows, and content publishing support.",
                color: "text-sage",
              },
              {
                icon: Users,
                title: "Lead & Collaborate",
                description:
                  "I've led cross-functional teams through Agile sprints and coordinated multiple projects simultaneously. I believe good process enables good work, not the other way around.",
                color: "text-indigo",
              },
              {
                icon: BookOpen,
                title: "Keep Learning",
                description:
                  "The tech landscape changes fast. I spend time exploring new frameworks, tools, and best practices. Recently, I've been diving deep into AI/ML and automation architecture.",
                color: "text-primary",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="surface-paper p-6 h-full hover-organic transition-all">
                  <item.icon className={`h-8 w-8 mb-4 ${item.color}`} />
                  <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills - The Honest Version */}
        <section>
          <Card className="surface-paper p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-4">
                Skills & Tools
              </h2>
              <p className="text-muted-foreground">
                Technologies I work with regularly. Not a checklist — these are
                tools I've used in shipped projects, coursework, and freelance builds.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "Next.js",
                    "Flutter",
                    "Dart",
                    "Framer Motion",
                    "HTML/CSS",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="hover:bg-primary/5 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Backend & Infrastructure</h3>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "n8n", "REST APIs", "Git"].map(
                    (skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="hover:bg-primary/5 transition-colors"
                      >
                        {skill}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {["VS Code", "Figma", "GitHub", "Vercel", "Supabase", "Postman", "Trello", "Asana"].map(
                    (skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="hover:bg-primary/5 transition-colors"
                      >
                        {skill}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Methodologies</h3>
                <div className="flex flex-wrap gap-2">
                  {["Agile/Scrum", "Lean Six Sigma", "Git Flow", "Code Review", "Documentation", "Testing"].map(
                    (skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="hover:bg-primary/5 transition-colors"
                      >
                        {skill}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Beyond Code - Personal interests */}
        <section>
          <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-8">
            Beyond the code
          </h2>
          <Card className="surface-paper p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Heart className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-xl">What interests me</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me exploring productivity
                  systems, learning about startup culture, or diving into the
                  latest AI/ML developments. I'm particularly interested in
                  how technology can solve problems specific to the Philippine
                  context.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I also believe in the importance of work-life balance. Quality
                  rest enables quality work — something I'm still learning to
                  practice consistently.
                </p>
              </div>

              <div className="space-y-4">
                <MapPin className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-xl">Where I'm headed</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Based in Davao City, I'm open to opportunities that let me
                  build meaningful products and work with thoughtful people.
                  Whether that's full-time, freelance, or startup collaboration
                  — I'm interested.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I'm particularly drawn to roles that combine technical work
                  with product thinking, team leadership, or automation
                  architecture.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Connect - Authentic invitation */}
        <section className="text-center py-12">
          <Card className="surface-paper p-12">
            <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-4">
              Let's have a conversation
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you want to discuss a project, share an opportunity, or
              just chat about tech and automation — I'd love to connect.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button size="lg" asChild className="rounded-full">
                <Link to="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Send a Message
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Elijah's GitHub profile"
                className="p-3 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Elijah's LinkedIn profile"
                className="p-3 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
