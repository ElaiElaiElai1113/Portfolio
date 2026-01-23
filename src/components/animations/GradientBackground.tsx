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
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[120px]"
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
        className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/30 rounded-full blur-[120px]"
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
        className="absolute top-[30%] left-[30%] w-[30%] h-[30%] bg-pink-500/20 rounded-full blur-[100px]"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
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
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-full blur-[100px]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"
      />
    </div>
  );
}
