/**
 * Seed data for portfolio
 * Run this in Supabase SQL editor or via a script to populate initial data
 */

// ===== PROJECTS =====
const projects = [
  {
    title: "GoDavao Ridesharing App",
    slug: "godavao-ridesharing-app",
    summary: "Thesis Capstone Project - A comprehensive ridesharing application for Davao City",
    role: "Project Manager & Developer",
    problem: "Need for a reliable, local ridesharing service tailored to Davao City's transportation needs",
    solution: "Led Agile sprints, task planning, backlog structuring, and execution tracking. Created comprehensive PM documents including requirements, workflows, and UAT scripts. Presented deliverables and managed stakeholder revisions.",
    case_study_md: `# GoDavao Ridesharing App

**Thesis Capstone Project | 2024-2025**

## Overview
A comprehensive ridesharing application designed specifically for Davao City, addressing local transportation needs with a focus on safety, reliability, and user experience.

## My Role
**Project Manager & Developer** - Led the entire development lifecycle from planning to deployment.

## Key Responsibilities
- Led Agile sprints, task planning, and backlog structuring
- Created comprehensive project management documents
- Developed requirements specifications and workflow documentation
- Created and managed UAT (User Acceptance Testing) scripts
- Presented deliverables to stakeholders and managed revisions
- Coordinated development team execution tracking

## Technologies Used
- **Frontend**: Flutter, Dart
- **Backend**: Node.js, Express
- **Database**: PostgreSQL/Supabase
- **Project Management**: Agile, Scrum, Trello, Asana

## Impact
- Successfully delivered thesis capstone project
- Demonstrated full-stack development capabilities
- Showcased project management leadership skills`,
    stack: ["Flutter", "Dart", "Node.js", "React", "Python", "PostgreSQL", "Agile", "Scrum"],
    tags: ["Mobile App", "Full-Stack", "Project Management", "Thesis", "Agile"],
    featured: true,
    featured_order: 1,
    status: "published"
  },
  {
    title: "DailyMacros POS & Ordering System",
    slug: "dailymacros-pos-ordering-system",
    summary: "A comprehensive Point of Sale and ordering system for business operations",
    role: "Product Manager & Developer",
    problem: "Businesses need an efficient way to manage sales, inventory, and customer orders",
    solution: "Led requirements gathering, UI/UX planning, and feature prioritization. Created detailed workflows and product documentation. Managed testing, deployment improvements, and provided regular client updates throughout the development process.",
    case_study_md: `# DailyMacros POS & Ordering System

**Product Manager & Developer | 2025**

## Overview
A comprehensive Point of Sale and ordering system designed to streamline business operations, manage inventory, and enhance customer ordering experience.

## My Role
**Product Manager & Developer** - Led the product from concept to deployment.

## Key Responsibilities
- Led requirements gathering sessions with stakeholders
- Planned UI/UX design and user journeys
- Prioritized features based on business value
- Created detailed workflow documentation
- Managed product documentation throughout lifecycle
- Oversaw testing and deployment improvements
- Provided regular updates to clients

## Technologies Used
- **Frontend**: React, HTML/CSS/JS
- **Backend**: Node.js, Python
- **Database**: SQL
- **Tools**: Figma (UI/UX), GitHub

## Features
- Point of Sale functionality
- Inventory management
- Customer ordering system
- Sales reporting and analytics
- User-friendly interface

## Impact
- Streamlined business operations for clients
- Improved order processing efficiency
- Enhanced inventory tracking capabilities`,
    stack: ["React", "Node.js", "Python", "SQL", "HTML", "CSS", "JavaScript", "Figma"],
    tags: ["Full-Stack", "Product Management", "UI/UX", "Business", "POS"],
    featured: true,
    featured_order: 2,
    status: "published"
  },
  {
    title: "Duyog Website",
    slug: "duyog-website",
    summary: "Official website for Ateneo de Davao University - Rush project delivered in one month",
    role: "Project Manager",
    problem: "Ateneo de Davao University needed a complete website solution delivered on tight deadline",
    solution: "Led Agile sprints for this rush project, coordinating between UI/UX team, DevOps, Backend, Frontend, and third-party payment software integration. Presented deliverables weekly and managed client revisions. Successfully deployed within one month of deadline.",
    case_study_md: `# Duyog Website

**Project Manager | Rush Project - 2025**

## Overview
A complete website solution for Ateneo de Davao University, delivered as a rush project within strict one-month deadline.

## My Role
**Project Manager** - Coordinated cross-functional teams and managed delivery timeline.

## Key Responsibilities
- Led Agile sprints and task planning
- Structured and managed backlog
- Coordinated between multiple teams:
  - UI/UX Design Team
  - DevOps Team
  - Backend Developers
  - Frontend Developers
  - Third-party payment software integration
- Presented deliverables to client weekly
- Managed revisions based on client feedback
- Ensured successful deployment within deadline

## Challenge
**Rush Project** - Complete website delivery required within one month

## Technologies Used
- **Frontend**: React, HTML/CSS/JS
- **Backend**: Node.js
- **Payment Integration**: Third-party payment software
- **Collaboration**: GitHub, Slack, Zoom

## Achievement
✅ Successfully deployed within one month of deadline
✅ Coordinated 5+ different teams/roles
✅ Integrated complex payment system
✅ Managed weekly client presentations and revisions

## Impact
- Delivered professional website for university on time
- Demonstrated strong project management under pressure
- Successfully coordinated complex multi-team project`,
    stack: ["React", "Node.js", "HTML", "CSS", "JavaScript", "DevOps", "GitHub"],
    tags: ["Project Management", "Web Development", "Rush Project", "University", "Agile"],
    featured: true,
    featured_order: 3,
    status: "published"
  },
  {
    title: "Duyog Website",
    slug: "duyog-website",
    summary: "Official website for Ateneo de Davao University - Rush project delivered in one month",
    role: "Project Manager",
    problem: "Ateneo de Davao University needed a complete website solution delivered on tight deadline",
    solution: "Led Agile sprints for this rush project, coordinating between UI/UX team, DevOps, Backend, Frontend, and third-party payment software integration. Presented deliverables weekly and managed client revisions. Successfully deployed within one month of deadline.",
    case_study_md: `# Duyog Website

**Project Manager | Rush Project - 2025**

## Overview
A complete website solution for Ateneo de Davao University, delivered as a rush project within strict one-month deadline.

## My Role
**Project Manager** - Coordinated cross-functional teams and managed delivery timeline.

## Key Responsibilities
- Led Agile sprints and task planning
- Structured and managed backlog
- Coordinated between multiple teams:
  - UI/UX Design Team
  - DevOps Team
  - Backend Developers
  - Frontend Developers
  - Third-party payment software integration
- Presented deliverables to client weekly
- Managed revisions based on client feedback
- Ensured successful deployment within deadline

## Challenge
**Rush Project** - Complete website delivery required within one month

## Technologies Used
- **Frontend**: React, HTML/CSS/JS
- **Backend**: Node.js
- **Payment Integration**: Third-party payment software
- **Collaboration**: GitHub, Slack, Zoom

## Achievement
✅ Successfully deployed within one month of deadline
✅ Coordinated 5+ different teams/roles
✅ Integrated complex payment system
✅ Managed weekly client presentations and revisions

## Impact
- Delivered professional website for university on time
- Demonstrated strong project management under pressure
- Successfully coordinated complex multi-team project`,
    stack: ["React", "Node.js", "HTML", "CSS", "JavaScript", "DevOps", "GitHub"],
    tags: ["Project Management", "Web Development", "Rush Project", "University", "Agile"],
    featured: true,
    featured_order: 3,
    status: "published"
  }
];

// ===== EXPERIENCE =====
const experiences = [
  {
    company: "Ateneo de Davao University CSSEC",
    role: "Productions & Documentation Officer",
    location: "Davao City, Philippines",
    start_date: "2022-01-01",
    end_date: "2023-12-31",
    bullets: [
      "Assisted in event hosting, logistics, and documentation preparation",
      "Supported multi-team coordination for academic events",
      "Managed production workflows and documentation systems",
      "Coordinated with various teams for successful event execution"
    ],
    skills: ["Event Management", "Documentation", "Team Coordination", "Logistics", "Agile"],
    sort_order: 1
  },
  {
    company: "Metropolitan Property Management",
    role: "Virtual Assistant",
    location: "Remote",
    start_date: "2021-06-01",
    end_date: "2021-12-31",
    bullets: [
      "Handled administrative tasks, documentation, and data entry",
      "Conducted market research and analysis",
      "Coordinated tenant and vendor communications",
      "Improved workflow organization and reporting accuracy"
    ],
    skills: ["Administrative Support", "Data Entry", "Communication", "Research", "Organization"],
    sort_order: 2
  }
];

// ===== CERTIFICATIONS =====
const certifications = [
  {
    name: "Lean Six Sigma Yellow Belt",
    issuer: "Lean Six Sigma",
    issue_date: "2025-01-01",
    credential_url: null,
    badge_image_url: null,
    sort_order: 1
  },
  {
    name: "Lean Six Sigma White Belt",
    issuer: "Lean Six Sigma",
    issue_date: "2025-01-01",
    credential_url: null,
    badge_image_url: null,
    sort_order: 2
  },
  {
    name: "DICT IDEAS PlugIn Activity - Startup Innovation Event",
    issuer: "Department of Information and Communications Technology (DICT)",
    issue_date: "2025-05-08",
    credential_url: null,
    badge_image_url: null,
    sort_order: 3
  },
  {
    name: "Agile Project Management",
    issuer: "Currently Enrolled",
    issue_date: "2025-01-01",
    credential_url: null,
    badge_image_url: null,
    sort_order: 4
  }
];

// ===== SKILLS =====
const skills = [
  // Frontend
  { name: "React", category: "Frontend", level: "advanced", sort_order: 1 },
  { name: "Flutter", category: "Frontend", level: "intermediate", sort_order: 2 },
  { name: "Dart", category: "Frontend", level: "intermediate", sort_order: 3 },
  { name: "HTML", category: "Frontend", level: "advanced", sort_order: 4 },
  { name: "CSS", category: "Frontend", level: "advanced", sort_order: 5 },
  { name: "JavaScript", category: "Frontend", level: "advanced", sort_order: 6 },

  // Backend
  { name: "Node.js", category: "Backend", level: "advanced", sort_order: 1 },
  { name: "Python", category: "Backend", level: "intermediate", sort_order: 2 },
  { name: "Express", category: "Backend", level: "intermediate", sort_order: 3 },
  { name: "SQL", category: "Backend", level: "intermediate", sort_order: 4 },
  { name: "Core Java", category: "Backend", level: "intermediate", sort_order: 5 },

  // Project Management
  { name: "Agile", category: "Project Management", level: "advanced", sort_order: 1 },
  { name: "Scrum", category: "Project Management", level: "advanced", sort_order: 2 },
  { name: "Sprint Planning", category: "Project Management", level: "advanced", sort_order: 3 },
  { name: "Backlog Grooming", category: "Project Management", level: "advanced", sort_order: 4 },
  { name: "Requirements Gathering", category: "Project Management", level: "advanced", sort_order: 5 },
  { name: "Process Mapping", category: "Project Management", level: "intermediate", sort_order: 6 },
  { name: "Workflow Optimization", category: "Project Management", level: "intermediate", sort_order: 7 },

  // Tools & Platforms
  { name: "Git", category: "Tools", level: "intermediate", sort_order: 1 },
  { name: "GitHub", category: "Tools", level: "intermediate", sort_order: 2 },
  { name: "Trello", category: "Tools", level: "advanced", sort_order: 3 },
  { name: "Asana", category: "Tools", level: "advanced", sort_order: 4 },
  { name: "Figma", category: "Tools", level: "beginner", sort_order: 5 },
  { name: "Slack", category: "Tools", level: "advanced", sort_order: 6 },
  { name: "Zoom", category: "Tools", level: "advanced", sort_order: 7 },
  { name: "Google Workspace", category: "Tools", level: "advanced", sort_order: 8 },

  // Soft Skills
  { name: "Fast Learner (100+ WPM)", category: "Soft Skills", level: "expert", sort_order: 1 },
  { name: "Detail-Oriented", category: "Soft Skills", level: "advanced", sort_order: 2 },
  { name: "Organized", category: "Soft Skills", level: "advanced", sort_order: 3 },
  { name: "Task Prioritization", category: "Soft Skills", level: "advanced", sort_order: 4 },
  { name: "Timeline Tracking", category: "Soft Skills", level: "advanced", sort_order: 5 },
  { name: "Stakeholder Communication", category: "Soft Skills", level: "advanced", sort_order: 6 },
  { name: "Independent Work", category: "Soft Skills", level: "advanced", sort_order: 7 },
  { name: "Remote Work", category: "Soft Skills", level: "advanced", sort_order: 8 }
];

// ===== ADMIN (for initial setup) =====
const admins = [
  {
    user_id: "elijah-admin-001",
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

-- ===== INSERT PROJECTS =====
INSERT INTO projects (title, slug, summary, role, problem, solution, case_study_md, stack, tags, featured, featured_order, status, created_at, updated_at)
VALUES
  ('GoDavao Ridesharing App', 'godavao-ridesharing-app', 'Thesis Capstone Project - A comprehensive ridesharing application for Davao City',
   'Project Manager & Developer',
   'Need for a reliable, local ridesharing service tailored to Davao City''s transportation needs',
   'Led Agile sprints, task planning, backlog structuring, and execution tracking. Created comprehensive PM documents including requirements, workflows, and UAT scripts.',
   '# GoDavao Ridesharing App\n\n**Thesis Capstone Project | 2024-2025**\n\n## Overview\nA comprehensive ridesharing application designed specifically for Davao City.',
   ARRAY['Flutter', 'Dart', 'Node.js', 'React', 'Python', 'PostgreSQL', 'Agile', 'Scrum'],
   ARRAY['Mobile App', 'Full-Stack', 'Project Management', 'Thesis', 'Agile'],
   true, 1, 'published', NOW(), NOW()),

  ('DailyMacros POS & Ordering System', 'dailymacros-pos-ordering-system', 'A comprehensive Point of Sale and ordering system for business operations',
   'Product Manager & Developer',
   'Businesses need an efficient way to manage sales, inventory, and customer orders',
   'Led requirements gathering, UI/UX planning, and feature prioritization. Created detailed workflows and product documentation.',
   '# DailyMacros POS & Ordering System\n\n**Product Manager & Developer | 2025**',
   ARRAY['React', 'Node.js', 'Python', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Figma'],
   ARRAY['Full-Stack', 'Product Management', 'UI/UX', 'Business', 'POS'],
   true, 2, 'published', NOW(), NOW()),

  ('Duyog Website', 'duyog-website', 'Official website for Ateneo de Davao University - Rush project delivered in one month',
   'Project Manager',
   'Ateneo de Davao University needed a complete website solution delivered on tight deadline',
   'Led Agile sprints, coordinated between UI/UX, DevOps, Backend, Frontend, and payment software. Successfully deployed within one month.',
   '# Duyog Website\n\n**Project Manager | Rush Project - 2025**',
   ARRAY['React', 'Node.js', 'HTML', 'CSS', 'JavaScript', 'DevOps', 'GitHub'],
   ARRAY['Project Management', 'Web Development', 'Rush Project', 'University', 'Agile'],
   true, 3, 'published', NOW(), NOW());

-- ===== INSERT EXPERIENCE =====
INSERT INTO experiences (company, role, location, start_date, end_date, bullets, skills, sort_order, created_at, updated_at)
VALUES
  ('Ateneo de Davao University CSSEC', 'Productions & Documentation Officer', 'Davao City, Philippines', '2022-01-01', '2023-12-31',
   ARRAY['Assisted in event hosting, logistics, and documentation preparation',
         'Supported multi-team coordination for academic events',
         'Managed production workflows and documentation systems',
         'Coordinated with various teams for successful event execution'],
   ARRAY['Event Management', 'Documentation', 'Team Coordination', 'Logistics', 'Agile'],
   1, NOW(), NOW()),

  ('Metropolitan Property Management', 'Virtual Assistant', 'Remote', '2021-06-01', '2021-12-31',
   ARRAY['Handled administrative tasks, documentation, and data entry',
         'Conducted market research and analysis',
         'Coordinated tenant and vendor communications',
         'Improved workflow organization and reporting accuracy'],
   ARRAY['Administrative Support', 'Data Entry', 'Communication', 'Research', 'Organization'],
   2, NOW(), NOW());

-- ===== INSERT CERTIFICATIONS =====
INSERT INTO certifications (name, issuer, issue_date, credential_url, badge_image_url, sort_order, created_at)
VALUES
  ('Lean Six Sigma Yellow Belt', 'Lean Six Sigma', '2025-01-01', NULL, NULL, 1, NOW()),
  ('Lean Six Sigma White Belt', 'Lean Six Sigma', '2025-01-01', NULL, NULL, 2, NOW()),
  ('DICT IDEAS PlugIn Activity - Startup Innovation Event', 'Department of Information and Communications Technology (DICT)', '2025-05-08', NULL, NULL, 3, NOW()),
  ('Agile Project Management', 'Currently Enrolled', '2025-01-01', NULL, NULL, 4, NOW());

-- ===== INSERT SKILLS =====
INSERT INTO skills (name, category, level, sort_order, created_at)
VALUES
  -- Frontend
  ('React', 'Frontend', 'advanced', 1, NOW()),
  ('Flutter', 'Frontend', 'intermediate', 2, NOW()),
  ('Dart', 'Frontend', 'intermediate', 3, NOW()),
  ('HTML', 'Frontend', 'advanced', 4, NOW()),
  ('CSS', 'Frontend', 'advanced', 5, NOW()),
  ('JavaScript', 'Frontend', 'advanced', 6, NOW()),

  -- Backend
  ('Node.js', 'Backend', 'advanced', 1, NOW()),
  ('Python', 'Backend', 'intermediate', 2, NOW()),
  ('Express', 'Backend', 'intermediate', 3, NOW()),
  ('SQL', 'Backend', 'intermediate', 4, NOW()),
  ('Core Java', 'Backend', 'intermediate', 5, NOW()),

  -- Project Management
  ('Agile', 'Project Management', 'advanced', 1, NOW()),
  ('Scrum', 'Project Management', 'advanced', 2, NOW()),
  ('Sprint Planning', 'Project Management', 'advanced', 3, NOW()),
  ('Backlog Grooming', 'Project Management', 'advanced', 4, NOW()),
  ('Requirements Gathering', 'Project Management', 'advanced', 5, NOW()),

  -- Tools
  ('Git', 'Tools', 'intermediate', 1, NOW()),
  ('GitHub', 'Tools', 'intermediate', 2, NOW()),
  ('Trello', 'Tools', 'advanced', 3, NOW()),
  ('Asana', 'Tools', 'advanced', 4, NOW()),
  ('Figma', 'Tools', 'beginner', 5, NOW()),
  ('Slack', 'Tools', 'advanced', 6, NOW()),
  ('Zoom', 'Tools', 'advanced', 7, NOW()),
  ('Google Workspace', 'Tools', 'advanced', 8, NOW()),

  -- Soft Skills
  ('Fast Learner (100+ WPM)', 'Soft Skills', 'expert', 1, NOW()),
  ('Detail-Oriented', 'Soft Skills', 'advanced', 2, NOW()),
  ('Organized', 'Soft Skills', 'advanced', 3, NOW()),
  ('Task Prioritization', 'Soft Skills', 'advanced', 4, NOW()),
  ('Stakeholder Communication', 'Soft Skills', 'advanced', 5, NOW());
`;
