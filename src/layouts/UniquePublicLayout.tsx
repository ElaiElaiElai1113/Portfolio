import { ErrorBoundary } from "@/components/ErrorBoundary";
import { UniqueNavigation } from "@/components/UniqueNavigation";
import { UniqueFooter } from "@/components/UniqueFooter";

export function UniquePublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <a
          href="#main-content"
          className="fixed left-6 top-4 z-[60] -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Skip to main content
        </a>
        <UniqueNavigation />

        {/* Main content with top padding for fixed nav */}
        <main id="main-content" tabIndex={-1} className="pt-20">
          {children}
        </main>

        <UniqueFooter />
      </div>
    </ErrorBoundary>
  );
}
