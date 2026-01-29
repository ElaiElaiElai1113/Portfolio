import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug, getProjectMedia, getPublishedProjects } from "@/services";
import { ArrowLeft, Github, ExternalLink, Play, User, Lightbulb, Rocket, Award, Printer, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useEffect, useMemo, useRef, useState } from "react";

type TocItem = { id: string; text: string; level: 2 | 3 };

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getHeadingId(text: string, counts: Map<string, number>) {
  const base = slugify(text);
  const next = (counts.get(base) ?? 0) + 1;
  counts.set(base, next);
  return next === 1 ? base : `${base}-${next}`;
}

function buildToc(markdown?: string) {
  if (!markdown) return [] as TocItem[];
  const lines = markdown.split("\n");
  const counts = new Map<string, number>();
  const items: TocItem[] = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);
    if (!h2 && !h3) continue;
    const level = h2 ? 2 : 3;
    const text = (h2 ?? h3)![1].trim();
    const id = getHeadingId(text, counts);
    items.push({ id, text, level });
  }

  return items;
}

type MarkdownSection = { title: string; content: string };

function splitMarkdownSections(markdown?: string) {
  if (!markdown) return [] as MarkdownSection[];
  const lines = markdown.split("\n");
  const sections: MarkdownSection[] = [];
  let currentTitle = "";
  let buffer: string[] = [];

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)/);
    if (match) {
      if (currentTitle || buffer.join("").trim()) {
        sections.push({ title: currentTitle || "Overview", content: buffer.join("\n").trim() });
      }
      currentTitle = match[1].trim();
      buffer = [];
      continue;
    }
    buffer.push(line);
  }

  if (currentTitle || buffer.join("").trim()) {
    sections.push({ title: currentTitle || "Overview", content: buffer.join("\n").trim() });
  }

  return sections.filter((section) => section.content.length > 0);
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudyExpanded, setCaseStudyExpanded] = useState(false);
  const headingIndexRef = useRef(0);
  const h3IndexRef = useRef(0);
  const caseStudyCardRef = useRef<HTMLDivElement | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug!),
    enabled: !!slug,
  });

  const { data: media } = useQuery({
    queryKey: ["project-media", project?.id],
    queryFn: () => getProjectMedia(project!.id),
    enabled: !!project?.id,
  });
  const { data: allProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: getPublishedProjects,
  });

  const caseStudyMeta = project?.case_study_meta ?? [];
  const caseStudyTakeaways = project?.case_study_takeaways ?? [];
  const caseStudyWhy = project?.case_study_why;
  const caseStudyContributions = project?.case_study_contributions ?? [];
  const caseStudyBody = project?.case_study_md ?? "";
  const caseStudyToc = buildToc(caseStudyBody);
  const caseStudySections = splitMarkdownSections(caseStudyBody);
  const h2Items = caseStudyToc.filter((item) => item.level === 2);
  const h3Items = caseStudyToc.filter((item) => item.level === 3);

  const navLinks = useMemo(() => {
    if (!allProjects || !project) return { prev: null, next: null };
    const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
    if (currentIndex === -1) return { prev: null, next: null };
    return {
      prev: allProjects[currentIndex - 1] ?? null,
      next: allProjects[currentIndex + 1] ?? null,
    };
  }, [allProjects, project]);

  useEffect(() => {
    const handleScroll = () => {
      const node = caseStudyCardRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const start = window.scrollY + rect.top - 120;
      const end = start + rect.height - window.innerHeight;
      const raw = (window.scrollY - start) / Math.max(end - start, 1);
      const clamped = Math.min(1, Math.max(0, raw));
      setReadingProgress(clamped);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [caseStudyBody]);

  headingIndexRef.current = 0;
  h3IndexRef.current = 0;

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <Link to="/projects">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link to="/projects">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Back button */}
      <ScrollReveal>
        <Link to="/projects">
          <Button variant="ghost" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Button>
        </Link>
      </ScrollReveal>

      {/* Hero */}
      <ScrollReveal delay={0.1}>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {project.featured && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white border-0">Featured</Badge>
                </motion.div>
              )}
              {project.status && (
                <Badge variant="secondary" className="capitalize">{project.status}</Badge>
              )}
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{project.summary}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.live_url && (
              <Button size="lg" asChild className="group hover-lift">
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /> Live Demo
                </a>
              </Button>
            )}
            {project.repo_url && (
              <Button size="lg" variant="outline" asChild className="group hover-lift">
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" /> GitHub Repository
                </a>
              </Button>
            )}
            {project.demo_video_url && (
              <Button size="lg" variant="outline" asChild className="group hover-lift">
                <a
                  href={project.demo_video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play className="mr-2 h-5 w-5" /> Watch Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Cover Image */}
      {project.cover_image_url && (
        <ScrollReveal delay={0.2}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-video w-full glass-strong rounded-2xl overflow-hidden shadow-glow"
          >
            <img
              src={project.cover_image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </ScrollReveal>
      )}

      {/* Tech Stack */}
      <ScrollReveal delay={0.3}>
        <div className="glass rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge variant="outline" className="text-sm px-3 py-1 hover:shadow-glow transition-all">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Tabs */}
      <ScrollReveal delay={0.4}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start glass p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background/50">Overview</TabsTrigger>
            {project.case_study_md && (
              <TabsTrigger value="case-study" className="data-[state=active]:bg-background/50">Case Study</TabsTrigger>
            )}
            {media && media.length > 0 && (
              <TabsTrigger value="gallery" className="data-[state=active]:bg-background/50">Media Gallery</TabsTrigger>
            )}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {project.role && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass hover:shadow-glow transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                        <User className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">Role</h3>
                        <p className="text-muted-foreground">{project.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {project.problem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass hover:shadow-glow transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-orange-500/10 text-orange-500 shrink-0">
                        <Lightbulb className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">The Problem</h3>
                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {project.solution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glass hover:shadow-glow transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-green-500/10 text-green-500 shrink-0">
                        <Rocket className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">The Solution</h3>
                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* Case Study Tab */}
          {project.case_study_md && (
            <TabsContent value="case-study" className="mt-6">
              <div className="space-y-6">
                {caseStudyMeta.length > 0 && (
                  <Card className="glass-strong overflow-hidden">
                    <CardContent className="pt-6">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {caseStudyMeta.map((item) => (
                          <div key={item.label} className="rounded-xl border border-border/60 bg-background/40 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                              {item.label}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-foreground">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
                  <Card className="glass-strong overflow-hidden" ref={caseStudyCardRef}>
                    <div className="h-1 bg-muted">
                      <div
                        className="h-full bg-primary transition-all duration-200"
                        style={{ width: `${readingProgress * 100}%` }}
                      />
                    </div>
                    <CardContent className="pt-8 pb-8">
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          Case Study
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.print()}
                          className="gap-2"
                        >
                          <Printer className="h-4 w-4" />
                          Print / Save PDF
                        </Button>
                      </div>

                      {(caseStudyTakeaways.length > 0 || caseStudyWhy || caseStudyContributions.length > 0) && (
                        <div className="grid gap-4 lg:grid-cols-2 mb-8">
                          {caseStudyTakeaways.length > 0 && (
                            <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                                Key Takeaways
                              </p>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                {caseStudyTakeaways.map((item) => (
                                  <li key={item} className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {(caseStudyWhy || caseStudyContributions.length > 0) && (
                            <div className="rounded-xl border border-border/60 bg-background/40 p-5 space-y-4">
                              {caseStudyWhy && (
                                <div>
                                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                                    Why It Matters
                                  </p>
                                  <p className="text-sm text-muted-foreground">{caseStudyWhy}</p>
                                </div>
                              )}
                              {caseStudyContributions.length > 0 && (
                                <div>
                                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                                    My Contributions
                                  </p>
                                  <ul className="space-y-2 text-sm text-muted-foreground">
                                    {caseStudyContributions.map((item) => (
                                      <li key={item} className="flex gap-2">
                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      {caseStudyToc.length > 0 && (
                        <details className="mb-6 rounded-lg border border-border/60 bg-background/40 p-4 lg:hidden">
                          <summary className="cursor-pointer text-sm font-semibold text-foreground">
                            Contents
                          </summary>
                          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                            {caseStudyToc.map((item) => (
                              <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                                <a className="hover:text-primary transition-colors" href={`#${item.id}`}>
                                  {item.text}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}

                      <div className={`relative ${caseStudyExpanded ? "" : "max-h-[560px] overflow-hidden"}`}>
                        {!caseStudyExpanded && (
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/90 to-transparent" />
                        )}
                        <div className="space-y-6 max-w-3xl mx-auto">
                          {caseStudySections.map((section, index) => {
                            const sectionId = h2Items[index]?.id ?? slugify(section.title);
                            return (
                              <details key={sectionId} open className="rounded-xl border border-border/60 bg-background/40 p-5">
                                <summary id={sectionId} className="cursor-pointer text-lg font-semibold text-foreground">
                                  {section.title}
                                </summary>
                                <div className="mt-4 prose prose-slate dark:prose-invert md:prose-lg max-w-none
                                  prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-6 prose-h3:font-medium
                                  prose-p:leading-7 prose-p:text-muted-foreground prose-p:text-base prose-p:mb-5
                                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:underline-offset-2
                                  prose-strong:text-foreground prose-strong:font-semibold
                                  prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-primary
                                  prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:shadow-sm
                                  prose-ul:my-5 prose-ol:my-5 prose-ul:space-y-3 prose-ol:space-y-3
                                  prose-li:text-muted-foreground prose-li:leading-7 prose-li:marker:text-primary
                                  prose-ol:marker:text-primary prose-ol:marker:font-semibold
                                ">
                                  <ReactMarkdown
                                    components={{
                                      h3: ({ children }) => {
                                        const text = String(children);
                                        const id =
                                          h3Items[h3IndexRef.current]?.id ?? slugify(text);
                                        h3IndexRef.current += 1;
                                        return <h3 id={id}>{children}</h3>;
                                      },
                                    }}
                                  >
                                    {section.content}
                                  </ReactMarkdown>
                                </div>
                              </details>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3 justify-center">
                        <Button
                          variant={caseStudyExpanded ? "outline" : "default"}
                          onClick={() => setCaseStudyExpanded((prev) => !prev)}
                        >
                          {caseStudyExpanded ? "Collapse document" : "View full document"}
                        </Button>
                        <Button variant="ghost" asChild>
                          <a href="#top">Back to top</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {caseStudyToc.length > 0 && (
                    <aside className="hidden lg:block">
                      <div className="sticky top-24 rounded-xl border border-border/60 bg-background/50 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                          Contents
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {caseStudyToc.map((item) => (
                            <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                              <a className="hover:text-primary transition-colors" href={`#${item.id}`}>
                                {item.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </aside>
                  )}
                </div>
              </div>
            </TabsContent>
          )}

          {/* Media Gallery Tab */}
          {media && media.length > 0 && (
            <TabsContent value="gallery" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {media.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass hover:shadow-glow transition-all overflow-hidden group">
                      {item.type === "image" ? (
                        <div className="relative overflow-hidden">
                          <motion.img
                            src={item.url}
                            alt={item.caption || "Project image"}
                            className="w-full aspect-video object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      ) : (
                        <video
                          src={item.url}
                          controls
                          className="w-full aspect-video"
                        />
                      )}
                      {item.caption && (
                        <CardContent className="pt-4">
                          <p className="text-sm text-muted-foreground">
                            {item.caption}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </ScrollReveal>

      {(navLinks.prev || navLinks.next) && (
        <ScrollReveal delay={0.2}>
          <div className="grid gap-4 md:grid-cols-2">
            {navLinks.prev && (
              <Card className="glass hover:shadow-glow transition-all">
                <CardContent className="pt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      Previous
                    </p>
                    <p className="text-lg font-semibold text-foreground">{navLinks.prev.title}</p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to={`/projects/${navLinks.prev.slug}`}>View</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
            {navLinks.next && (
              <Card className="glass hover:shadow-glow transition-all">
                <CardContent className="pt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      Next
                    </p>
                    <p className="text-lg font-semibold text-foreground">{navLinks.next.title}</p>
                  </div>
                  <Button asChild>
                    <Link to={`/projects/${navLinks.next.slug}`}>
                      View <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.3}>
        <Card className="glass-strong overflow-hidden">
          <CardContent className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                Explore more
              </p>
              <p className="text-lg font-semibold text-foreground">Browse the full project archive</p>
            </div>
            <Button asChild>
              <Link to="/projects">
                Back to Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
