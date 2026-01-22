-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  role TEXT,
  problem TEXT,
  solution TEXT,
  stack TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured BOOLEAN DEFAULT FALSE,
  featured_order INTEGER,
  repo_url TEXT,
  live_url TEXT,
  demo_video_url TEXT,
  cover_image_url TEXT,
  case_study_md TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_media table
CREATE TABLE IF NOT EXISTS project_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  bullets TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE NOT NULL,
  credential_url TEXT,
  badge_image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Public can read published projects" 
ON projects FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admins can read all projects" 
ON projects FOR SELECT 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can insert projects" 
ON projects FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can update projects" 
ON projects FOR UPDATE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can delete projects" 
ON projects FOR DELETE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- RLS Policies for project_media
CREATE POLICY "Public can read media for published projects" 
ON project_media FOR SELECT 
USING (
  EXISTS (SELECT 1 FROM projects WHERE id = project_media.project_id AND status = 'published')
);

CREATE POLICY "Admins can read all media" 
ON project_media FOR SELECT 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can insert media" 
ON project_media FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can update media" 
ON project_media FOR UPDATE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can delete media" 
ON project_media FOR DELETE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- RLS Policies for experiences
CREATE POLICY "Public can read experiences" 
ON experiences FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert experiences" 
ON experiences FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can update experiences" 
ON experiences FOR UPDATE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can delete experiences" 
ON experiences FOR DELETE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- RLS Policies for certifications
CREATE POLICY "Public can read certifications" 
ON certifications FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert certifications" 
ON certifications FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can update certifications" 
ON certifications FOR UPDATE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can delete certifications" 
ON certifications FOR DELETE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- RLS Policies for skills
CREATE POLICY "Public can read skills" 
ON skills FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert skills" 
ON skills FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can update skills" 
ON skills FOR UPDATE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can delete skills" 
ON skills FOR DELETE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- RLS Policies for messages
CREATE POLICY "Public can insert messages" 
ON messages FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can read messages" 
ON messages FOR SELECT 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can update messages" 
ON messages FOR UPDATE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can delete messages" 
ON messages FOR DELETE 
TO authenticated 
USING (
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- RLS Policies for admins
CREATE POLICY "Admins can read admins" 
ON admins FOR SELECT 
TO authenticated 
USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

CREATE POLICY "Users can insert themselves as admins" 
ON admins FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_project_media_project_id ON project_media(project_id);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_admins_user_id ON admins(user_id);
CREATE INDEX idx_skills_category ON skills(category);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
