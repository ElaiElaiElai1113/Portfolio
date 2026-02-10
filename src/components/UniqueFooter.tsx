import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function UniqueFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand - distinctive typography */}
          <div className="space-y-4">
            <div className="text-lg font-['Playfair_Display'] font-semibold">
              Elijah De Los Santos
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-Stack Developer & Automation Architect building thoughtful
              digital products that balance craft, performance, and meaning.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-terracotta fill-terracotta" />
              <span>in Davao City</span>
            </div>
          </div>

          {/* Navigation - organized differently */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Explore
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "Projects", href: "/projects" },
                { name: "Automation", href: "/automation" },
                { name: "Experience", href: "/experience" },
                { name: "About", href: "/about" },
                { name: "Certifications", href: "/certifications" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect - social links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/elijahndelosantos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Github className="h-4 w-4 group-hover:text-foreground transition-colors" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/elijahndelosantos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Linkedin className="h-4 w-4 group-hover:text-foreground transition-colors" />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:contact@elijahndelosantos.com"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Mail className="h-4 w-4 group-hover:text-foreground transition-colors" />
                <span>Email</span>
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Available for remote opportunities
            </p>
          </div>
        </div>

        {/* Bottom bar - distinctive style */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Elijah De Los Santos. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with{" "}
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                React
              </a>
              ,{" "}
              <a
                href="https://www.typescriptlang.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                TypeScript
              </a>
              , and care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
