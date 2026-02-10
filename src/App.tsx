import { Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageTransition } from "@/components/animations/PageTransition";
import { HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { UniquePublicLayout } from "@/layouts/UniquePublicLayout";

// Public Pages
import UniqueHomePage from "@/pages/UniqueHomePage";
import UniqueAboutPage from "@/pages/UniqueAboutPage";
import AutomationPage from "@/pages/AutomationPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ExperiencePage from "@/pages/ExperiencePage";
import CertificationsPage from "@/pages/CertificationsPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

function AnimatedOutlet() {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Outlet />
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
        <Toaster />
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
