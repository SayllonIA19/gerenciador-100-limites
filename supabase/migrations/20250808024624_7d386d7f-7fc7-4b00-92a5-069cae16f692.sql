-- Create roles table for user access levels
CREATE TABLE public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create profiles table for teams/project groups
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_profiles table for many-to-many relationship between users and teams
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE(user_id, profile_id)
);

-- Insert default roles
INSERT INTO public.roles (name) VALUES 
    ('admin'),
    ('user');

-- Enable Row Level Security
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for roles table
CREATE POLICY "Everyone can view roles" ON public.roles
    FOR SELECT USING (true);

-- RLS Policies for profiles table
CREATE POLICY "Everyone can view profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create profiles" ON public.profiles
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update profiles" ON public.profiles
    FOR UPDATE TO authenticated USING (true);

-- RLS Policies for user_profiles table
CREATE POLICY "Users can view their own profile associations" ON public.user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile associations" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile associations" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile associations" ON public.user_profiles
    FOR DELETE USING (auth.uid() = user_id);

-- Create trigger for updating timestamps
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();