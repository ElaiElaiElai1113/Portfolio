import { motion } from 'framer-motion';

interface GradientBackgroundProps {
  className?: string;
}

export function GradientBackground({ className = '' }: GradientBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/25 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-amber-400/25 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-[30%] left-[30%] w-[30%] h-[30%] bg-teal-400/20 rounded-full blur-[100px]"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#6b728012_1px,transparent_1px),linear-gradient(to_bottom,#6b728012_1px,transparent_1px)] bg-[size:24px_24px]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />
    </div>
  );
}

export function HeroGradient({ className = '' }: GradientBackgroundProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.18, 0.3, 0.18],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/2 top-[42%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.2),transparent_62%)] blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -18, 0],
          y: [0, 16, 0],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-[12%] top-[18%] h-72 w-72 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.18),transparent_65%)] blur-[110px]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
      />
    </div>
  );
}
