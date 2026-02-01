import { motion, Transition } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

const staggerContainerVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export function StaggerContainer({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      variants={staggerContainerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
};

export function FadeInUp({
  children,
  delay = 0,
  className = '',
}: PageTransitionProps & { delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="initial"
      animate="enter"
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

const scaleInVariants = {
  initial: { opacity: 0, scale: 0.95 },
  enter: { opacity: 1, scale: 1 },
};

export function ScaleIn({
  children,
  delay = 0,
  className = '',
}: PageTransitionProps & { delay?: number; className?: string }) {
  return (
    <motion.div
      variants={scaleInVariants}
      initial="initial"
      animate="enter"
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

const slideInLeftVariants = {
  initial: { opacity: 0, x: -30 },
  enter: { opacity: 1, x: 0 },
};

export function SlideInLeft({
  children,
  delay = 0,
  className = '',
}: PageTransitionProps & { delay?: number; className?: string }) {
  return (
    <motion.div
      variants={slideInLeftVariants}
      initial="initial"
      animate="enter"
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

const slideInRightVariants = {
  initial: { opacity: 0, x: 30 },
  enter: { opacity: 1, x: 0 },
};

export function SlideInRight({
  children,
  delay = 0,
  className = '',
}: PageTransitionProps & { delay?: number; className?: string }) {
  return (
    <motion.div
      variants={slideInRightVariants}
      initial="initial"
      animate="enter"
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

// Re-export ScrollReveal from the separate file
export { ScrollReveal } from './ScrollReveal';
