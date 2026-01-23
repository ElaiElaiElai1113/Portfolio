import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

interface ResumeDownloadButtonProps {
  resumeUrl?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function ResumeDownloadButton({
  resumeUrl = '/resume.pdf',
  className = '',
  variant = 'default',
  size = 'default',
}: ResumeDownloadButtonProps) {
  const handleDownload = () => {
    // Track download event (e.g., analytics)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resume_download', {
        event_category: 'engagement',
        event_label: 'resume',
      });
    }

    // Open resume in new tab
    window.open(resumeUrl, '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Button
        variant={variant}
        size={size}
        onClick={handleDownload}
        className="group relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/0"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
        <span className="relative flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Download Resume
          <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
        </span>
      </Button>
    </motion.div>
  );
}

// Animated resume icon component
export function AnimatedResumeIcon({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <FileText className="h-6 w-6" />
    </motion.div>
  );
}
