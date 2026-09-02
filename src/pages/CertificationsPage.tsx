import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getCertifications } from "@/services";
import { ExternalLink, Award, Calendar, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/animations/PageTransition";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { LINKEDIN_URL } from "@/lib/site";

export default function CertificationsPage() {
  const { data: certifications, isLoading } = useQuery({
    queryKey: ["certifications"],
    queryFn: getCertifications,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  return (
    <>
      <SEO
        title="Certifications"
        description="Certifications and professional learning milestones supporting my approach to quality, process improvement, and product delivery."
      />

      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header */}
        <ScrollReveal>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Award className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Certifications &amp; Learning
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              A concise record of completed credentials and professional learning
              that supports how I approach quality and product delivery.
            </p>
          </div>
        </ScrollReveal>

        {/* Certifications Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="space-y-5 p-7">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full rounded-xl" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : certifications && certifications.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert, index) => (
              <ScrollReveal key={cert.id} delay={index * 0.05}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <Card className="surface-paper h-full overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg">
                    <div className="h-1 bg-gradient-to-r from-primary via-indigo to-sage" />
                    <CardContent className="flex h-full flex-col p-6 sm:p-7">
                      <div className="mb-7 flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                          {cert.badge_image_url ? (
                            <img
                              src={cert.badge_image_url}
                              alt=""
                              className="h-8 w-8 object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <ShieldCheck className="h-6 w-6" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <time dateTime={cert.issue_date}>{formatDate(cert.issue_date)}</time>
                        </div>
                      </div>

                      <p className="mb-3 text-xs uppercase tracking-[0.28em] text-primary">
                        Professional learning
                      </p>
                      <h2 className="text-xl font-semibold leading-snug sm:text-2xl">
                        {cert.title}
                      </h2>
                      <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                        <Award className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{cert.issuer}</span>
                      </p>

                      {cert.credential_id && (
                        <p className="mt-4 text-xs text-muted-foreground font-mono">
                          Credential ID: {cert.credential_id}
                        </p>
                      )}

                      <div className="mt-auto pt-7">
                        {cert.credential_url ? (
                        <Button
                          variant="outline"
                          className="w-full group"
                          asChild
                        >
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Verify Credential
                            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                        ) : (
                          <p className="rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-sm text-muted-foreground">
                            Credential details available on request.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-20 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto"
              >
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-2">No certifications yet</h3>
                <p className="text-muted-foreground">
                  Professional certifications will be displayed here.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        {!isLoading && certifications && certifications.length > 0 && (
          <ScrollReveal delay={0.3}>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Want credential details or more context on how I apply this training?
              </p>
              <Button size="lg" asChild>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  View LinkedIn Profile
                </a>
              </Button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </>
  );
}
