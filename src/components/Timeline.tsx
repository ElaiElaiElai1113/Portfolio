import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  title: string;
  organization?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  tags?: string[];
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border/50" />

      {/* Timeline items */}
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="relative pl-20"
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.1 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="absolute left-6 top-6 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-glow"
            />

            {/* Timeline card */}
            <Card className="glass hover:shadow-glow transition-all hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {item.icon}
                      {item.title}
                      {item.current && (
                        <Badge className="ml-2 animate-pulse-subtle">Current</Badge>
                      )}
                    </CardTitle>
                    {item.organization && (
                      <CardDescription className="text-base font-medium text-foreground mt-1">
                        {item.organization}
                      </CardDescription>
                    )}
                  </div>
                </div>

                {/* Date and location */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(item.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                      {" - "}
                      {item.current
                        ? "Present"
                        : item.endDate
                        ? new Date(item.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : "Present"}
                    </span>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              {(item.description || item.tags) && (
                <CardContent className="space-y-4">
                  {item.description && (
                    <p className="text-muted-foreground">{item.description}</p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
