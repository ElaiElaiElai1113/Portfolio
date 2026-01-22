# Dynamic Portfolio Web Application

A production-ready, data-driven portfolio web application built with React, Vite, TypeScript, Supabase, Tailwind CSS, and shadcn/ui. This portfolio features a public-facing site and a secure admin CMS dashboard for managing content dynamically.

## 🚀 Features

### Public Site

- **Home Page**: Hero section, featured projects, skills showcase, and quick links
- **Projects Page**: Searchable, filterable project grid with detailed project views
- **Project Detail**: Overview, case study (Markdown), media gallery, and tech stack
- **Experience**: Vertical timeline layout with professional history
- **Certifications**: Card grid with badge images
- **Contact Form**: Saves messages to database
- **Dark/Light Mode**: Theme toggle with persistence
- **Fully Responsive**: Mobile-first design with Tailwind CSS

### Admin CMS Dashboard

- **Secure Authentication**: Supabase Auth with admin-only access
- **Projects Management**: CRUD operations with draft/published status
- **Featured Projects**: Toggle and ordering system
- **Experience Management**: Add/update work history with bullets and skills
- **Certifications Manager**: Add certifications with badge images
- **Skills Manager**: Categorized skills with proficiency levels
- **Messages Inbox**: View and manage contact form submissions
- **Image Upload**: Supabase Storage integration for media files
- **Markdown Editor**: Rich case study content support
- **Toast Notifications**: Success/error feedback

## 🛠 Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality React components (Radix UI)
- **TanStack Query** - Data fetching and caching
- **React Hook Form + Zod** - Form validation
- **React Markdown** - Markdown rendering
- **Lucide React** - Icon library

### Backend

- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - File Storage
  - Row Level Security (RLS)

### Deployment

- **Vercel/Netlify** ready
- Environment-based configuration

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd myportfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Navigate to the SQL Editor

#### Run the Database Schema

Copy the contents of `supabase/schema.sql` and run it in the Supabase SQL Editor to create all tables, RLS policies, and storage buckets.

#### Configure Storage

1. Go to Storage in Supabase
2. Create buckets: `portfolio-media`, `portfolio-files`
3. Make buckets public for public access to project images

#### Create Admin User

```sql
-- After running the schema, add yourself as admin
INSERT INTO admins (user_id)
VALUES ('your-user-id-from-auth-users-table');
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Get these values from your Supabase project settings (Settings → API).

### 5. Generate TypeScript Types

```bash
npx supabase gen types typescript --project-id your-project-id > src/types/database.types.ts
```

Replace `your-project-id` with your actual Supabase project ID.

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## 📁 Project Structure

```
myportfolio/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   └── ui/            # shadcn/ui components
│   ├── context/           # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/             # Custom hooks
│   ├── layouts/           # Layout components
│   │   ├── PublicLayout.tsx
│   │   └── AdminLayout.tsx
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin pages
│   │   ├── ContactPage.tsx
│   │   ├── ExperiencePage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ProjectsPage.tsx
│   │   └── ProjectDetailPage.tsx
│   ├── services/          # API functions
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── supabase/
│   └── schema.sql         # Database schema
├── .env                   # Environment variables
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🗄️ Database Schema

### Tables

- **projects**: Portfolio projects with metadata
- **project_media**: Images and videos for projects
- **experiences**: Work history entries
- **certifications**: Professional certifications
- **skills**: Technical skills by category
- **messages**: Contact form submissions
- **admins**: Admin user access control

### Security

- Row Level Security (RLS) enabled on all tables
- Public read access for published content
- Admin-only write access
- Message submission open to public

## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **Admin Authentication**: Supabase Auth with admin verification
- **Route Guards**: Protected admin routes
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Parameterized queries via Supabase
- **XSS Protection**: React's built-in escaping

## 🎨 Design System

Built with shadcn/ui components featuring:

- **Minimal**: Clean, uncluttered interface
- **Premium**: Product-like quality and polish
- **Accessible**: WCAG compliant components
- **Dark Mode**: Full dark/light theme support
- **Responsive**: Mobile-first design

## 📝 Usage Guide

### Public Site

1. Browse projects, experience, and certifications
2. Search and filter projects
3. View detailed project information
4. Submit contact form

### Admin Dashboard

1. Navigate to `/admin/login`
2. Sign in with your Supabase account
3. Access dashboard from `/admin`
4. Manage all portfolio content
5. Upload images via Supabase Storage
6. Create/edit projects with Markdown case studies

## 🚢 Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Push code to GitHub
2. Connect repository in Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables
5. Deploy

### Environment Variables for Production

Add the same variables as in `.env` to your deployment platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🧪 Testing

```bash
# Run TypeScript compiler
npm run build

# Type check only
npx tsc --noEmit
```

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Built as a demonstration of full-stack development skills with modern web technologies.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Supabase](https://supabase.com/) for the excellent backend solution
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
