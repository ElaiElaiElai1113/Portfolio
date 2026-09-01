import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  src?: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function ProjectVisual({
  src,
  alt,
  className,
  loading = "lazy",
}: ProjectVisualProps) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={`${alt} preview unavailable`}
        className={cn(
          "flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_42%),linear-gradient(135deg,hsl(var(--card)),hsl(var(--background)))] text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="h-8 w-8" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
