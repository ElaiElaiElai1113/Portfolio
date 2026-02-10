import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import { UniqueNavigation } from "@/components/UniqueNavigation";

export function UniquePublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-background">
          <UniqueNavigation />

          {/* Main content with top padding for fixed nav */}
          <div className="pt-20">{children}</div>

          {/* Footer - Unique design */}
          <footer className="border-t border-border/50 mt-24">
            <div className="container mx-auto px-6 py-12">
              <div className="grid gap-8 md:grid-cols-3">
                {/* Brand */}
                <div className="space-y-4">
                  <div className="text-lg font-semibold font-['Playfair_Display']">
                    Elijah De Los Santos
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Full-Stack Developer & Automation Architect building
                    thoughtful digital products.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider">
                    Explore
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {["Projects", "Automation", "Experience", "About", "Contact"].map(
                      (item) => (
                        <a
                          key={item}
                          href={`/${item.toLowerCase()}`}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item}
                        </a>
                      )
                    )}
                  </div>
                </div>

                {/* Connect */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider">
                    Connect
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Based in Davao City, Philippines
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Open to opportunities
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Elijah De Los Santos
                </p>
                <p className="text-sm text-muted-foreground">
                  Built with care using React & TypeScript
                </p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </ErrorBoundary>
    </HelmetProvider>
  );
}
