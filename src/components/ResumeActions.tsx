import { motion, useReducedMotion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResumeActionsProps {
  resumeUrl?: string;
  downloadName?: string;
  size?: "default" | "sm" | "lg";
  wrapperClassName?: string;
  viewClassName?: string;
  downloadClassName?: string;
}

type AnalyticsWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters: Record<string, string>,
  ) => void;
};

function trackResumeAction(eventName: "resume_view" | "resume_download") {
  (window as AnalyticsWindow).gtag?.("event", eventName, {
    event_category: "engagement",
    event_label: "resume",
  });
}

export function ResumeActions({
  resumeUrl = "/elijah-de-los-santos-resume.pdf",
  downloadName = "Elijah-De-Los-Santos-Resume.pdf",
  size = "default",
  wrapperClassName,
  viewClassName,
  downloadClassName,
}: ResumeActionsProps) {
  const reduceMotion = useReducedMotion();
  const hover = reduceMotion ? undefined : { y: -2 };
  const tap = reduceMotion ? undefined : { scale: 0.98 };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", wrapperClassName)}>
      <motion.div whileHover={hover} whileTap={tap}>
        <Button asChild variant="outline" size={size} className={viewClassName}>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="View resume PDF in a new tab"
            onClick={() => trackResumeAction("resume_view")}
          >
            <FileText aria-hidden="true" />
            View Resume
            <ExternalLink aria-hidden="true" />
          </a>
        </Button>
      </motion.div>

      <motion.div whileHover={hover} whileTap={tap}>
        <Button asChild variant="ghost" size={size} className={downloadClassName}>
          <a
            href={resumeUrl}
            download={downloadName}
            aria-label="Download resume PDF"
            onClick={() => trackResumeAction("resume_download")}
          >
            <Download aria-hidden="true" />
            Download PDF
          </a>
        </Button>
      </motion.div>
    </div>
  );
}
