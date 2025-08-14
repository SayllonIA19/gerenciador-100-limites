-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  default_role_id uuid;
BEGIN
  -- Get the default role ID (assuming 'user' role exists)
  SELECT id INTO default_role_id 
  FROM public.roles 
  WHERE name = 'user' 
  LIMIT 1;

  -- Insert new profile with default role
  INSERT INTO public.profiles (id, role_id, name)
  VALUES (
    NEW.id, 
    default_role_id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email)
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();