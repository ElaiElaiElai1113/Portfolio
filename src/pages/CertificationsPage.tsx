import { Skeleton } from "@/components/ui/skeleton";
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
import { getCertifications } from "@/services";
import { ExternalLink, Award, Calendar, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/animations/PageTransition";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";

export default function CertificationsPage() {
  const { data: certifications, isLoading } = useQuery({
    queryKey: ["certifications"],
    queryFn: getCertifications,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const isExpired = (expirationDate: string | null) => {
    if (!expirationDate) return false;
    return new Date(expirationDate) < new Date();
  };

  return (
    <>
      <SEO
        title="Certifications"
        description="Professional certifications and credentials I've earned to validate my skills and expertise."
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <ScrollReveal>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Award className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">Certifications</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Professional certifications and credentials I've earned to validate my
              skills and expertise.
            </p>
          </div>
        </ScrollReveal>

        {/* Certifications Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-32 w-full mb-4 rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : certifications && certifications.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <ScrollReveal key={cert.id} delay={index * 0.05}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full transition-all hover:shadow-xl border-border/50 hover:border-border">
                    <CardHeader>
                      {cert.badge_image_url ? (
                        <div className="aspect-square w-full bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-4 overflow-hidden flex items-center justify-center p-8">
                          <motion.img
                            src={cert.badge_image_url}
                            alt={`${cert.title} badge`}
                            className="w-full h-full object-contain drop-shadow-lg"
                            whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                            transition={{ duration: 0.5 }}
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="aspect-square w-full bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                          <Award className="h-20 w-20 text-primary/50" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <CardTitle className="line-clamp-2">{cert.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1.5">
                          <Award className="h-4 w-4" />
                          {cert.issuer}
                        </CardDescription>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(cert.issue_date)}</span>
                          </div>

                          {cert.expiration_date && (
                            <Badge
                              variant={isExpired(cert.expiration_date) ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {isExpired(cert.expiration_date) ? "Expired" : "Valid"}
                            </Badge>
                          )}
                        </div>

                        {cert.expiration_date && !isExpired(cert.expiration_date) && (
                          <p className="text-xs text-muted-foreground">
                            Expires: {formatDate(cert.expiration_date)}
                          </p>
                        )}

                        {cert.credential_id && (
                          <p className="text-xs text-muted-foreground font-mono">
                            ID: {cert.credential_id}
                          </p>
                        )}
                      </div>
                    </CardHeader>

                    {cert.credential_url && (
                      <CardContent>
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
                            <CheckCircle2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                            Verify Credential
                            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      </CardContent>
                    )}
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
                Want to verify a certification or learn more about my skills?
              </p>
              <Button size="lg" asChild>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
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
