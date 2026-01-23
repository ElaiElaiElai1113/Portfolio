import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypingEffectProps {
  words: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function TypingEffect({
  words,
  className = '',
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: TypingEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentWord.slice(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, pauseDuration]);

  // Blink cursor effect
  useEffect(() => {
    const cursorTimeout = setTimeout(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearTimeout(cursorTimeout);
  }, [showCursor]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        className="inline-block w-0.5 h-current bg-current ml-1"
      />
    </span>
  );
}
