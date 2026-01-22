import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";

// Layouts
import { PublicLayout } from "@/layouts/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

// Route Guards
import { AdminRoute } from "@/components/AdminRoute";

// Public Pages
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ExperiencePage from "@/pages/ExperiencePage";
import CertificationsPage from "@/pages/CertificationsPage";
import ContactPage from "@/pages/ContactPage";

// Admin Pages
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProjectsAdmin from "@/pages/admin/ProjectsAdmin";
import ExperienceAdmin from "@/pages/admin/ExperienceAdmin";
import CertificationsAdmin from "@/pages/admin/CertificationsAdmin";
import SkillsAdmin from "@/pages/admin/SkillsAdmin";
import MessagesAdmin from "@/pages/admin/MessagesAdmin";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Outlet />
            </PublicLayout>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="experience" element={<ExperienceAdmin />} />
          <Route path="certifications" element={<CertificationsAdmin />} />
          <Route path="skills" element={<SkillsAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
