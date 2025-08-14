-- 1. Create 'teams' table
CREATE TABLE public.teams (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE, -- owner/creator
    created_at timestamptz DEFAULT now()
);

-- 2. Create 'team_members' table
CREATE TABLE public.team_members (
    team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_in_team text,
    created_at timestamptz DEFAULT now(),
    PRIMARY KEY (team_id, profile_id)
);

-- 3. Create 'permissions' table
CREATE TABLE public.permissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 4. Create 'role_permissions' table
CREATE TABLE public.role_permissions (
    role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id uuid NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    PRIMARY KEY (role_id, permission_id)
);

-- 5. Add 'role_id' foreign key to 'profiles' table
ALTER TABLE public.profiles
ADD COLUMN role_id uuid REFERENCES public.roles(id) ON DELETE SET NULL;

-- Enable RLS on new tables
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for teams
CREATE POLICY "Users can view teams they are members of" ON public.teams
FOR SELECT USING (
    profile_id = auth.uid() OR 
    EXISTS (
        SELECT 1 FROM public.team_members 
        WHERE team_id = teams.id AND profile_id = auth.uid()
    )
);

CREATE POLICY "Users can create teams" ON public.teams
FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Team owners can update their teams" ON public.teams
FOR UPDATE USING (profile_id = auth.uid());

CREATE POLICY "Team owners can delete their teams" ON public.teams
FOR DELETE USING (profile_id = auth.uid());

-- Create RLS policies for team_members
CREATE POLICY "Users can view team memberships for teams they belong to" ON public.team_members
FOR SELECT USING (
    profile_id = auth.uid() OR 
    EXISTS (
        SELECT 1 FROM public.teams 
        WHERE id = team_members.team_id AND profile_id = auth.uid()
    )
);

CREATE POLICY "Team owners can manage team members" ON public.team_members
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.teams 
        WHERE id = team_members.team_id AND profile_id = auth.uid()
    )
);

-- Create RLS policies for permissions (read-only for most users)
CREATE POLICY "Everyone can view permissions" ON public.permissions
FOR SELECT USING (true);

-- Create RLS policies for role_permissions (read-only for most users)
CREATE POLICY "Everyone can view role permissions" ON public.role_permissions
FOR SELECT USING (true);

-- Insert some default permissions
INSERT INTO public.permissions (name) VALUES 
    ('read_projects'),
    ('write_projects'),
    ('delete_projects'),
    ('manage_teams'),
    ('manage_users'),
    ('admin_access');

-- Assign permissions to existing roles
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 
    r.id as role_id,
    p.id as permission_id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'admin';

INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 
    r.id as role_id,
    p.id as permission_id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'user' AND p.name IN ('read_projects', 'write_projects');