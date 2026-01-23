import { useSpring, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  className = '',
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { duration: duration * 1000 });
  const previousValue = useRef(value);

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplayValue(Math.floor(latest));
  });

  useEffect(() => {
    if (value !== previousValue.current) {
      spring.set(value);
      previousValue.current = value;
    }
  }, [value, spring]);

  return (
    <span className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
