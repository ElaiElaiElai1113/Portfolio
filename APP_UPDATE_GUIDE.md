# Quick Update Guide for App.tsx

## What to Change in `src/App.tsx`

### Step 1: Add the Automation Page Import

At the top of your `src/App.tsx`, add:

```typescript
import AutomationPage from "@/pages/AutomationPage";
```

### Step 2: Add the Automation Route

Inside your Routes component, add this route (around line 50):

```typescript
<Route path="automation" element={<AutomationPage />} />
```

### Optional: Switch to New Components

If you want to use the redesigned components, update your imports:

**Replace:**
```typescript
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import { PublicLayout } from "@/layouts/PublicLayout";
```

**With:**
```typescript
import HomePage from "@/pages/UniqueHomePage";
import AboutPage from "@/pages/UniqueAboutPage";
import { UniquePublicLayout } from "@/layouts/UniquePublicLayout";
```

**Then replace:**
```typescript
<PublicLayout>
  <AnimatedOutlet />
</PublicLayout>
```

**With:**
```typescript
<UniquePublicLayout>
  <AnimatedOutlet />
</UniquePublicLayout>
```

## Complete Updated App.tsx Example

```typescript
import { Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageTransition } from "@/components/animations/PageTransition";
import { HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

// Layouts
import { UniquePublicLayout } from "@/layouts/UniquePublicLayout";

// Public Pages
import HomePage from "@/pages/UniqueHomePage";
import AboutPage from "@/pages/UniqueAboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ExperiencePage from "@/pages/ExperiencePage";
import CertificationsPage from "@/pages/CertificationsPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";
import AutomationPage from "@/pages/AutomationPage"; // NEW!

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
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="certifications" element={<CertificationsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="automation" element={<AutomationPage />} /> {/* NEW! */}
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
```

## Testing Checklist

After updating:

- [ ] Visit `/` - Homepage loads with new design
- [ ] Visit `/about` - About page loads with new design
- [ ] Visit `/automation` - NEW automation page works
- [ ] Test navigation - All links work
- [ ] Test mobile - Responsive design works
- [ ] Test dark mode - Theme toggle works
- [ ] Test keyboard shortcuts - Press `?` to see shortcuts

## That's It!

Just these simple changes and you'll have the redesigned portfolio with the new automation section.

**Note**: You can always revert by switching back to the old imports if needed.
