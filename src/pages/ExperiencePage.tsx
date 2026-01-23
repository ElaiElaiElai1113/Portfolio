import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "@/services";
import { MapPin, Calendar, Building2, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/animations/PageTransition";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";

export default function ExperiencePage() {
  const { data: experiences, isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mo`;
    }
  };

  return (
    <>
      <SEO
        title="Experience"
        description="My professional journey in full-stack development. View my work history, roles, and career milestones."
      />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <ScrollReveal>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Experience</h1>
            <p className="text-xl text-muted-foreground">
              My professional journey and career milestones in software development.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pl-8 border-l-2 border-muted">
                <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary" />
                <Skeleton className="h-48 w-full" />
              </div>
            ))}
          </div>
        ) : experiences && experiences.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500" />

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <ScrollReveal key={experience.id} delay={index * 0.1}>
                  <div className="relative pl-16">
                    {/* Animated timeline dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", delay: index * 0.1 }}
                      className={`absolute left-2 top-0 h-7 w-7 rounded-full bg-gradient-to-br from-primary to-purple-500 shadow-lg shadow-primary/20 ${
                    index === 0 ? "ring-4 ring-primary/30" : ""
                  }`}
                    />

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <Card className="overflow-hidden border-border/50 hover:border-border transition-all hover:shadow-lg">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                <CardTitle className="text-2xl">
                                  {experience.company}
                                </CardTitle>
                                {experience.current && (
                                  <Badge variant="default" className="ml-2">Current</Badge>
                                )}
                              </div>
                              <p className="text-lg font-semibold text-foreground">
                                {experience.role}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                            {experience.location && (
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                <span>{experience.location}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {formatDate(experience.start_date)} -{" "}
                                {formatDate(experience.end_date)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <TrendingUp className="h-4 w-4" />
                              <span>{calculateDuration(experience.start_date, experience.end_date)}</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                          {/* Skills used */}
                          {experience.skills && experience.skills.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-3">Skills & Technologies</p>
                              <div className="flex flex-wrap gap-2">
                                {experience.skills.map((skill: string) => (
                                  <motion.span
                                    key={skill}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20 cursor-default"
                                  >
                                    {skill}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Description */}
                          {experience.description && (
                            <p className="text-muted-foreground">{experience.description}</p>
                          )}

                          {/* Bullet points */}
                          {experience.bullets && experience.bullets.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-3">Key Achievements</p>
                              <ul className="space-y-3">
                                {experience.bullets.map(
                                  (bullet: string, bulletIndex: number) => (
                                    <motion.li
                                      key={bulletIndex}
                                      initial={{ opacity: 0, x: -10 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      transition={{ delay: (index * 0.1) + (bulletIndex * 0.05) }}
                                      className="flex gap-3 text-muted-foreground"
                                    >
                                      <span className="text-primary mt-1">•</span>
                                      <span>{bullet}</span>
                                    </motion.li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="py-20 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto"
              >
                <div className="text-6xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-2">No experience yet</h3>
                <p className="text-muted-foreground">
                  Experience entries will be displayed here.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
