import { lazy, Suspense } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageTransition } from "@/components/animations/PageTransition";
import { HelmetProvider } from "react-helmet-async";

import { UniquePublicLayout } from "@/layouts/UniquePublicLayout";
import NotFoundPage from "@/pages/NotFoundPage";

const UniqueHomePage = lazy(() => import("@/pages/UniqueHomePage"));
const UniqueAboutPage = lazy(() => import("@/pages/UniqueAboutPage"));
const AutomationPage = lazy(() => import("@/pages/AutomationPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const ExperiencePage = lazy(() => import("@/pages/ExperiencePage"));
const CertificationsPage = lazy(() => import("@/pages/CertificationsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));

function PageFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="container mx-auto px-6 py-20 sm:py-28"
    >
      <span className="sr-only">Loading page…</span>
      <div className="max-w-3xl space-y-5" aria-hidden="true">
        <div className="h-3 w-28 animate-pulse rounded-full bg-muted" />
        <div className="h-12 w-3/4 animate-pulse rounded-xl bg-muted" />
        <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-muted" />
        <div className="h-44 w-full animate-pulse rounded-2xl bg-muted" />
      </div>
    </div>
  );
}

function AnimatedOutlet() {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </PageTransition>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <UniquePublicLayout>
                <AnimatedOutlet />
              </UniquePublicLayout>
            }
          >
            <Route index element={<UniqueHomePage />} />
            <Route path="about" element={<UniqueAboutPage />} />
            <Route path="automation" element={<AutomationPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="certifications" element={<CertificationsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
