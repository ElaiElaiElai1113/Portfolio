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
        <UniqueNavigation />

          {/* Main content with top padding for fixed nav */}
          <div className="pt-20">{children}</div>

          <UniqueFooter />
      </div>
    </ErrorBoundary>
  );
}
