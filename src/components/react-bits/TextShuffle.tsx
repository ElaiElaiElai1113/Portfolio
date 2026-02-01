import { motion } from 'framer-motion';
import { useState } from 'react';

interface TextShuffleProps {
  text: string;
  className?: string;
  shuffleOnHover?: boolean;
}

const SHUFFLE_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function TextShuffle({ text, className = '', shuffleOnHover = true }: TextShuffleProps) {
  const [displayText, setDisplayText] = useState(text);

  const shuffle = (originalText: string) => {
    let iterations = 0;

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((_letter, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)];
          })
          .join('')
      );

      if (iterations >= originalText.length) {
        clearInterval(interval);
      }

      iterations += 1 / 2;
    }, 30);
  };

  return (
    <motion.span
      className={className}
      onHoverStart={() => shuffleOnHover && shuffle(text)}
    >
      {displayText}
    </motion.span>
  );
}
