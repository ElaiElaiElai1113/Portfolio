import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "@/services";
import { MapPin, Calendar } from "lucide-react";

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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Experience</h1>
        <p className="text-xl text-muted-foreground">
          My professional journey and career milestones.
        </p>
      </div>

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
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="relative pl-8 border-l-2 border-muted"
            >
              {/* Timeline dot */}
              <div
                className={`absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary ${
                  index === 0 ? "ring-4 ring-primary/20" : ""
                }`}
              />

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {experience.company}
                  </CardTitle>
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    <p className="font-semibold">{experience.role}</p>
                    {experience.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(experience.start_date)} -{" "}
                        {formatDate(experience.end_date)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Skills used */}
                  {experience.skills && experience.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.skills.map((skill: string) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bullet points */}
                  {experience.bullets && experience.bullets.length > 0 && (
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      {experience.bullets.map(
                        (bullet: string, bulletIndex: number) => (
                          <li key={bulletIndex}>{bullet}</li>
                        ),
                      )}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-xl text-muted-foreground">
              No experience entries yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
