import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "glow";
  className?: string;
  delay?: number;
}

export function AnimatedBadge({
  children,
  variant = "default",
  className,
  delay = 0,
}: AnimatedBadgeProps) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "text-foreground border border-input hover:bg-accent",
    glow: "glass hover:shadow-glow text-primary border-primary/50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Badge className={cn(variants[variant], className)} variant="outline">
        {children}
      </Badge>
    </motion.div>
  );
}

interface AnimatedPillProps {
  children: React.ReactNode;
  color?: "primary" | "purple" | "pink" | "blue" | "green";
  className?: string;
  delay?: number;
}

export function AnimatedPill({
  children,
  color = "primary",
  className,
  delay = 0,
}: AnimatedPillProps) {
  const colors = {
    primary: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20",
    pink: "bg-pink-500/10 text-pink-500 border-pink-500/20 hover:bg-pink-500/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ x: 2 }}
      className="inline-flex"
    >
      <Badge
        className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
          colors[color],
          className
        )}
        variant="outline"
      >
        {children}
      </Badge>
    </motion.div>
  );
}
