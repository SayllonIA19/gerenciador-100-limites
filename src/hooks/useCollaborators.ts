import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  status: 'active' | 'pending' | 'inactive';
  created_at: string;
  updated_at: string;
}

interface CollaboratorInsert {
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  status?: 'active' | 'pending' | 'inactive';
}

export function useCollaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch collaborators
  const fetchCollaborators = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('collaborators')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCollaborators(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar colaboradores",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create collaborator
  const createCollaborator = async (collaboratorData: CollaboratorInsert) => {
    try {
      const { data, error } = await supabase
        .from('collaborators')
        .insert({
          ...collaboratorData,
          status: collaboratorData.status || 'pending'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setCollaborators(prev => [data, ...prev]);
      toast({
        title: "Colaborador adicionado!",
        description: "O colaborador foi adicionado com sucesso.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar colaborador",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Update collaborator
  const updateCollaborator = async (id: string, updates: Partial<Collaborator>) => {
    try {
      const { data, error } = await supabase
        .from('collaborators')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setCollaborators(prev => 
        prev.map(collaborator => 
          collaborator.id === id ? data : collaborator
        )
      );

      toast({
        title: "Colaborador atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar colaborador",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Delete collaborator
  const deleteCollaborator = async (id: string) => {
    try {
      const { error } = await supabase
        .from('collaborators')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setCollaborators(prev => prev.filter(collaborator => collaborator.id !== id));
      toast({
        title: "Colaborador removido!",
        description: "O colaborador foi removido com sucesso.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao remover colaborador",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Get collaborator by ID
  const getCollaborator = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('collaborators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao carregar colaborador",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Load collaborators on mount
  useEffect(() => {
    fetchCollaborators();
  }, [user]);

  return {
    collaborators,
    loading,
    fetchCollaborators,
    createCollaborator,
    updateCollaborator,
    deleteCollaborator,
    getCollaborator,
  };
} 