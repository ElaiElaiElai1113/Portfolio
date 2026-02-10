import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UniqueHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center py-20">
      {/* Unique background - organic shapes, not gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large organic shapes using SVG */}
        <svg
          className="absolute top-0 left-0 w-[120%] h-[120%] -translate-x-[10%] -translate-y-[10%]"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M100 500 Q 250 200, 500 300 T 900 500"
            stroke="hsl(var(--primary) / 0.08)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 700 Q 300 400, 600 600 T 1000 500"
            stroke="hsl(var(--sage) / 0.06)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.path
            d="M200 0 Q 400 300, 500 500 T 800 1000"
            stroke="hsl(var(--terracotta) / 0.05)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.4 }}
          />
        </svg>

        {/* Subtle decorative circles */}
        <div className="absolute top-[20%] right-[15%] w-32 h-32 rounded-full border border-primary/10" />
        <div className="absolute top-[25%] right-[20%] w-24 h-24 rounded-full border border-sage/10" />
        <div className="absolute bottom-[30%] left-[10%] w-16 h-16 rounded-full border border-terracotta/10" />
        <div className="absolute bottom-[35%] left-[12%] w-8 h-8 rounded-full bg-primary/5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          {/* Organic, asymmetrical layout */}
          <div className="space-y-8">
            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium">Available for opportunities</span>
            </motion.div>

            {/* Main heading - distinctive typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight">
                <span className="block">Hello, I'm</span>
                <span className="block mt-2 font-['Playfair_Display'] font-semibold">
                  Elijah De Los Santos
                </span>
              </h1>
            </motion.div>

            {/* Subheading - unique approach */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
                I build thoughtful digital products that balance{" "}
                <span className="text-foreground font-medium">craft</span>,{" "}
                <span className="text-foreground font-medium">performance</span>,
                and{" "}
                <span className="text-foreground font-medium">meaning</span>.
              </p>
            </motion.div>

            {/* Roles - distinctive presentation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              {[
                "Full-Stack Developer",
                "Automation Architect",
                "Agile Practitioner",
                "Problem Solver",
              ].map((role, index) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-card/50 text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                  {role}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA - distinctive style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                asChild
                className="group relative overflow-hidden rounded-full px-8"
              >
                <Link to="/projects">
                  <span className="relative z-10 flex items-center gap-2">
                    View Projects
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="group rounded-full px-8 border-2"
              >
                <Link to="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
            </motion.div>

            {/* Social links - unique presentation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-6 pt-4"
            >
              <span className="text-sm text-muted-foreground">Find me on</span>
              <div className="flex items-center gap-4">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/elijahndelosantos",
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com/in/elijahndelosantos",
                    label: "LinkedIn",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                    whileHover={{ y: -2 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Side info - positioned differently */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden lg:block absolute top-0 right-0 w-64 text-right space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Based in
              </p>
              <p className="text-sm font-medium">Davao City, Philippines</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Education
              </p>
              <p className="text-sm">BS Information Systems</p>
              <p className="text-xs text-muted-foreground">
                Ateneo de Davao University
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Credentials
              </p>
              <p className="text-sm">Lean Six Sigma Certified</p>
              <p className="text-xs text-muted-foreground">Yellow Belt</p>
            </div>

            {/* Decorative element */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                <span>Dean's Lister</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - unique style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-current"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
