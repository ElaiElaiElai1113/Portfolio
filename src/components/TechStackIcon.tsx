import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TechStackIconProps {
  name: string;
  icon: ReactNode;
  color?: string;
  className?: string;
}

const techColors: Record<string, string> = {
  'React': '#61DAFB',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'Node.js': '#339933',
  'Python': '#3776AB',
  'Java': '#007396',
  'Go': '#00ADD8',
  'Rust': '#000000',
  'Vue': '#4FC08D',
  'Angular': '#DD0031',
  'Next.js': '#000000',
  'Tailwind CSS': '#06B6D4',
  'PostgreSQL': '#4169E1',
  'MongoDB': '#47A248',
  'Redis': '#DC382D',
  'Docker': '#2496ED',
  'AWS': '#FF9900',
  'GraphQL': '#E10098',
  'Git': '#F05032',
  'Figma': '#F24E1E',
};

export function TechStackIcon({ name, icon, color, className = '' }: TechStackIconProps) {
  const defaultColor = techColors[name] || '#6B7280';

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      whileTap={{ scale: 0.95 }}
      className={`relative group ${className}`}
      title={name}
    >
      <div
        className="p-3 rounded-lg bg-background border border-border/50 group-hover:border-border transition-colors"
        style={{ color: color || defaultColor }}
      >
        {icon}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap opacity-0 pointer-events-none"
      >
        {name}
      </motion.div>
    </motion.div>
  );
}

interface TechStackBadgeProps {
  tech: string;
  className?: string;
}

export function TechStackBadge({ tech, className = '' }: TechStackBadgeProps) {
  const color = techColors[tech];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      <div
        className="px-3 py-1 rounded-full text-xs font-medium border border-border/50 bg-background/50 backdrop-blur-sm"
        style={{ color: color || 'currentColor' }}
      >
        {tech}
      </div>
    </motion.div>
  );
}
