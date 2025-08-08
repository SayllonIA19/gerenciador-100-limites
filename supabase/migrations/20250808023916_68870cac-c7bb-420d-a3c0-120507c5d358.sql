-- Remove profiles table and all related objects safely

-- 1) Drop trigger on auth.users that inserted profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2) Drop the trigger on profiles table (if table still exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE t.tgname = 'trg_profiles_updated_at'
      AND n.nspname = 'public'
      AND c.relname = 'profiles'
  ) THEN
    EXECUTE 'DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles';
  END IF;
END $$;

-- 3) Drop RLS policies (if table exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'profiles'
  ) THEN
    EXECUTE 'DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles';
    EXECUTE 'DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles';
    EXECUTE 'DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles';
    EXECUTE 'DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles';
  END IF;
END $$;

-- 4) Drop the helper function that inserted profiles
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- 5) Finally, drop the profiles table
DROP TABLE IF EXISTS public.profiles CASCADE;