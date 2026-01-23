/**
 * Seed data for portfolio
 * Run this in Supabase SQL editor or via a script to populate initial data
 */

// ===== PROJECTS =====
const projects = [
  {
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    summary: "A full-featured online shopping platform with payment integration",
    description: `# E-Commerce Platform

A modern e-commerce solution built with React, Node.js, and PostgreSQL.

## Features
- User authentication and authorization
- Product catalog with advanced filtering
- Shopping cart and checkout process
- Payment integration with Stripe
- Order tracking and history
- Admin dashboard for inventory management

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Supabase
- **Payments**: Stripe
- **Deployment**: Vercel

## Impact
- Increased sales conversion by 35%
- Reduced page load time by 60%
- Handles 10,000+ daily active users`,
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    live_url: "https://demo-store.example.com",
    repo_url: "https://github.com/yourusername/ecommerce-platform",
    cover_image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    featured: true,
    featured_order: 1,
    status: "published"
  },
  {
    title: "Task Management App",
    slug: "task-management-app",
    summary: "Collaborative task manager with real-time updates",
    description: `# Task Management App

A Trello-style task management application with real-time collaboration features.

## Features
- Drag-and-drop task organization
- Real-time updates using WebSockets
- Team collaboration and permissions
- File attachments and comments
- Due dates and reminders
- Mobile-responsive design

## Tech Stack
- **Frontend**: Next.js, React, Framer Motion
- **Backend**: Supabase (Realtime)
- **UI**: shadcn/ui, Tailwind CSS
- **State**: Zustand

## Challenges & Solutions
- Implemented optimistic UI updates for better UX
- Solved race conditions in collaborative editing
- Built custom drag-and-drop system for mobile`,
    stack: ["Next.js", "React", "Supabase", "TypeScript", "Framer Motion"],
    live_url: "https://taskapp.example.com",
    repo_url: "https://github.com/yourusername/task-manager",
    featured: true,
    featured_order: 2,
    status: "published"
  },
  {
    title: "Weather Dashboard",
    slug: "weather-dashboard",
    summary: "Beautiful weather app with forecasts and maps",
    description: `# Weather Dashboard

A weather application with detailed forecasts, interactive maps, and location-based updates.

## Features
- Current weather conditions
- 7-day forecast with hourly details
- Interactive weather maps
- Location-based automatic updates
- Dark/light theme toggle
- Severe weather alerts

## Tech Stack
- **Frontend**: React, TypeScript
- **API**: OpenWeatherMap API
- **Maps**: Leaflet
- **State**: React Query

## Highlights
- Caching strategy reduces API calls by 90%
- Progressive Web App (PWA) capabilities
- Offline support with service workers`,
    stack: ["React", "TypeScript", "REST APIs", "PWA", "Leaflet"],
    live_url: "https://weather.example.com",
    repo_url: "https://github.com/yourusername/weather-dashboard",
    featured: true,
    featured_order: 3,
    status: "published"
  }
];

// ===== EXPERIENCE =====
const experiences = [
  {
    company: "TechCorp",
    position: "Senior Full-Stack Developer",
    start_date: "2022-06-01",
    end_date: null,
    current: true,
    description: "Leading development of core platform features and mentoring junior developers.",
    bullets: [
      "Architected and built microservices architecture handling 1M+ daily requests",
      "Reduced API response time by 70% through optimization and caching strategies",
      "Led team of 5 developers on flagship product rewrite",
      "Implemented CI/CD pipeline reducing deployment time by 80%",
      "Mentored 3 junior developers who promoted to mid-level within 1 year"
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],
    location: "San Francisco, CA",
    order: 1
  },
  {
    company: "Innovate Labs",
    position: "Full-Stack Developer",
    start_date: "2020-03-01",
    end_date: "2022-05-31",
    current: false,
    description: "Built web applications for various clients in healthcare and fintech sectors.",
    bullets: [
      "Developed 15+ client projects from concept to deployment",
      "Built reusable component library used across all company projects",
      "Integrated payment systems processing $500K+ monthly transactions",
      "Improved test coverage from 30% to 85%",
      "Collaborated with UX designers to implement pixel-perfect designs"
    ],
    skills: ["Vue.js", "Python", "Django", "PostgreSQL", "Docker"],
    location: "Remote",
    order: 2
  },
  {
    company: "StartupXYZ",
    position: "Junior Developer",
    start_date: "2018-06-01",
    end_date: "2020-02-29",
    current: false,
    description: "Started career building MVP for early-stage startup.",
    bullets: [
      "Built MVP that secured $2M seed funding",
      "Learned full-stack development with React and Node.js",
      "Implemented authentication and authorization systems",
      "Participated in agile development processes",
      "Contributed to all aspects of product development"
    ],
    skills: ["React", "JavaScript", "Node.js", "MongoDB", "Express"],
    location: "New York, NY",
    order: 3
  }
];

// ===== CERTIFICATIONS =====
const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issue_date: "2023-03-15",
    expiration_date: "2026-03-15",
    credential_id: "AWS-ASA-123456",
    credential_url: "https://aws.amazon.com/verification",
    badge_image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200",
    order: 1
  },
  {
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    issue_date: "2022-11-20",
    expiration_date: "2025-11-20",
    credential_id: "GCP-PD-789012",
    credential_url: "https://cloud.google.com/certification",
    badge_image_url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200",
    order: 2
  },
  {
    title: "Meta Front-End Developer Professional",
    issuer: "Meta",
    issue_date: "2022-07-10",
    expiration_date: null,
    credential_id: "META-FE-345678",
    credential_url: "https://www.coursera.org/account/accomplishments/certificate",
    badge_image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200",
    order: 3
  }
];

// ===== SKILLS =====
const skills = [
  // Frontend
  { name: "React", category: "Frontend", proficiency: "Expert", order: 1 },
  { name: "TypeScript", category: "Frontend", proficiency: "Expert", order: 2 },
  { name: "Next.js", category: "Frontend", proficiency: "Advanced", order: 3 },
  { name: "Vue.js", category: "Frontend", proficiency: "Advanced", order: 4 },
  { name: "Tailwind CSS", category: "Frontend", proficiency: "Expert", order: 5 },
  { name: "Framer Motion", category: "Frontend", proficiency: "Advanced", order: 6 },

  // Backend
  { name: "Node.js", category: "Backend", proficiency: "Expert", order: 1 },
  { name: "Express", category: "Backend", proficiency: "Expert", order: 2 },
  { name: "Python", category: "Backend", proficiency: "Intermediate", order: 3 },
  { name: "PostgreSQL", category: "Backend", proficiency: "Advanced", order: 4 },
  { name: "MongoDB", category: "Backend", proficiency: "Advanced", order: 5 },
  { name: "GraphQL", category: "Backend", proficiency: "Advanced", order: 6 },

  // DevOps
  { name: "Docker", category: "DevOps", proficiency: "Advanced", order: 1 },
  { name: "AWS", category: "DevOps", proficiency: "Advanced", order: 2 },
  { name: "CI/CD", category: "DevOps", proficiency: "Advanced", order: 3 },
  { name: "Git", category: "DevOps", proficiency: "Expert", order: 4 },

  // Tools
  { name: "Figma", category: "Tools", proficiency: "Intermediate", order: 1 },
  { name: "VS Code", category: "Tools", proficiency: "Expert", order: 2 },
  { name: "Postman", category: "Tools", proficiency: "Advanced", order: 3 }
];

// ===== ADMIN (for initial setup) =====
const admins = [
  {
    email: "admin@portfolio.com",
    name: "Admin User",
    role: "admin",
    created_at: new Date().toISOString()
  }
];

export { projects, experiences, certifications, skills, admins };

/**
 * SQL Script for Supabase
 * Copy this to your Supabase SQL Editor and run it
 */
export const seedSQL = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert Projects
INSERT INTO projects (title, slug, summary, description, stack, live_url, repo_url, cover_image_url, featured, featured_order, status, created_at, updated_at)
VALUES
  ('E-Commerce Platform', 'e-commerce-platform', 'A full-featured online shopping platform with payment integration',
   '{"description":"A modern e-commerce solution built with React, Node.js, and PostgreSQL."}',
   ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
   'https://demo-store.example.com', 'https://github.com/yourusername/ecommerce-platform',
   'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
   true, 1, 'published', NOW(), NOW()),
  ('Task Management App', 'task-management-app', 'Collaborative task manager with real-time updates',
   '{"description":"A Trello-style task management application"}',
   ARRAY['Next.js', 'React', 'Supabase', 'TypeScript', 'Framer Motion'],
   'https://taskapp.example.com', 'https://github.com/yourusername/task-manager',
   'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
   true, 2, 'published', NOW(), NOW()),
  ('Weather Dashboard', 'weather-dashboard', 'Beautiful weather app with forecasts and maps',
   '{"description":"A weather application with detailed forecasts"}',
   ARRAY['React', 'TypeScript', 'REST APIs', 'PWA', 'Leaflet'],
   'https://weather.example.com', 'https://github.com/yourusername/weather-dashboard',
   'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
   true, 3, 'published', NOW(), NOW());

-- Insert Experience
INSERT INTO experiences (company, position, start_date, end_date, current, description, bullets, skills, location, "order", created_at, updated_at)
VALUES
  ('TechCorp', 'Senior Full-Stack Developer', '2022-06-01', NULL, true,
   'Leading development of core platform features and mentoring junior developers.',
   ARRAY['Architected and built microservices architecture handling 1M+ daily requests',
         'Reduced API response time by 70% through optimization and caching strategies',
         'Led team of 5 developers on flagship product rewrite'],
   ARRAY['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
   'San Francisco, CA', 1, NOW(), NOW()),
  ('Innovate Labs', 'Full-Stack Developer', '2020-03-01', '2022-05-31', false,
   'Built web applications for various clients in healthcare and fintech sectors.',
   ARRAY['Developed 15+ client projects from concept to deployment',
         'Built reusable component library used across all company projects'],
   ARRAY['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Docker'],
   'Remote', 2, NOW(), NOW());

-- Insert Certifications
INSERT INTO certifications (title, issuer, issue_date, expiration_date, credential_id, credential_url, badge_image_url, "order", created_at, updated_at)
VALUES
  ('AWS Certified Solutions Architect', 'Amazon Web Services', '2023-03-15', '2026-03-15',
   'AWS-ASA-123456', 'https://aws.amazon.com/verification',
   'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200', 1, NOW(), NOW()),
  ('Google Cloud Professional Developer', 'Google Cloud', '2022-11-20', '2025-11-20',
   'GCP-PD-789012', 'https://cloud.google.com/certification',
   'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200', 2, NOW(), NOW());

-- Insert Skills
INSERT INTO skills (name, category, proficiency, "order", created_at, updated_at)
VALUES
  -- Frontend
  ('React', 'Frontend', 'Expert', 1, NOW(), NOW()),
  ('TypeScript', 'Frontend', 'Expert', 2, NOW(), NOW()),
  ('Next.js', 'Frontend', 'Advanced', 3, NOW(), NOW()),
  ('Vue.js', 'Frontend', 'Advanced', 4, NOW(), NOW()),
  ('Tailwind CSS', 'Frontend', 'Expert', 5, NOW(), NOW()),
  -- Backend
  ('Node.js', 'Backend', 'Expert', 1, NOW(), NOW()),
  ('Express', 'Backend', 'Expert', 2, NOW(), NOW()),
  ('Python', 'Backend', 'Intermediate', 3, NOW(), NOW()),
  ('PostgreSQL', 'Backend', 'Advanced', 4, NOW(), NOW()),
  ('MongoDB', 'Backend', 'Advanced', 5, NOW(), NOW()),
  -- DevOps
  ('Docker', 'DevOps', 'Advanced', 1, NOW(), NOW()),
  ('AWS', 'DevOps', 'Advanced', 2, NOW(), NOW()),
  ('Git', 'DevOps', 'Expert', 3, NOW(), NOW());
`;
