import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getCertifications } from "@/services";
import { ExternalLink, Award, Calendar } from "lucide-react";

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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Certifications</h1>
        <p className="text-xl text-muted-foreground">
          Professional certifications and credentials I've earned.
        </p>
      </div>

      {/* Certifications Grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-32 w-full mb-4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : certifications && certifications.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <Card key={cert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {cert.badge_image_url && (
                  <div className="aspect-square w-full bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={cert.badge_image_url}
                      alt={`${cert.name} badge`}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                )}
                <CardTitle className="line-clamp-2">{cert.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {cert.issuer}
                </CardDescription>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(cert.issue_date)}</span>
                </div>
              </CardHeader>
              <CardContent>
                {cert.credential_url && (
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Credential
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">
              No certifications yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
