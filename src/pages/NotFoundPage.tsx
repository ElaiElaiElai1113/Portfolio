import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { FadeInUp } from '@/components/animations/PageTransition';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        <FadeInUp>
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="text-9xl"
          >
            404
          </motion.div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-bold">
            Lost in the Digital Void
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <p className="text-xl text-muted-foreground">
            The page you're looking for doesn't exist or has been moved to another
            dimension.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/">
                <Home className="mr-2 h-5 w-5" /> Go Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-5 w-5" /> Go Back
            </Button>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Try these instead:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Projects', 'Experience', 'Contact'].map((item) => (
                <Button key={item} variant="ghost" asChild>
                  <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                </Button>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* Fun floating elements */}
        <div className="relative h-32 overflow-hidden">
          {['😕', '🔍', '🤔', '💻'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${20 + i * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
