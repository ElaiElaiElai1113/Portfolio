import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface SpotlightProps {
  className?: string;
  size?: number;
  color?: string;
}

export function Spotlight({ className = '', size = 600, color = 'rgba(124, 58, 237, 0.15)' }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(mouseX, { stiffness: 200, damping: 40 });
  const spotlightY = useSpring(mouseY, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);
      });
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="pointer-events-none absolute rounded-full blur-3xl will-change-transform"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          translateX: '-50%',
          translateY: '-50%',
          x: spotlightX,
          y: spotlightY,
        }}
      />
    </div>
  );
}
