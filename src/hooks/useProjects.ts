
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Project {
  id: string;
  title: string;
  subtitle: string | null;
  start_date: string | null;
  due_date: string | null;
  status: string;
  priority: string;
  assigned_to: string | null;
  budget: number | null;
  progress: number | null;
  created_at: string;
  updated_at: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchProjects = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar projetos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async (projectData: Partial<Project>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .upsert({
          ...projectData,
          user_id: user.id,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Projeto salvo com sucesso!",
        description: "Suas alterações foram salvas.",
      });

      fetchProjects();
      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao salvar projeto",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  return {
    projects,
    loading,
    saveProject,
    refetch: fetchProjects,
  };
}
