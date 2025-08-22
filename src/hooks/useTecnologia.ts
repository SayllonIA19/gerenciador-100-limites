import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface SugestaoTecnologia {
  id: string;
  titulo: string;
  descricao: string;
  criado_por_id: string;
  status: 'Pendente' | 'Avaliada' | 'Aprovada' | 'Rejeitada';
  projeto_id?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    name: string;
  };
}

export interface ProjetoTecnologia {
  id: string;
  titulo: string;
  descricao?: string;
  inicio: string;
  fim?: string;
  status: 'Nao iniciado' | 'Em andamento' | 'Terminado' | 'Cancelado';
  responsavel_id?: string;
  prioridade: 'Baixa' | 'Media' | 'Alta' | 'Urgente';
  created_at: string;
  updated_at: string;
  profiles?: {
    name: string;
  };
}

export interface AnexoProjetoTec {
  id: string;
  projeto_id: string;
  tipo: 'Documento' | 'Reuniao' | 'Link' | 'Arquitetura';
  url: string;
  descricao?: string;
  uploaded_at: string;
}

export function useTecnologia() {
  const [sugestoes, setSugestoes] = useState<SugestaoTecnologia[]>([]);
  const [projetos, setProjetos] = useState<ProjetoTecnologia[]>([]);
  const [anexos, setAnexos] = useState<AnexoProjetoTec[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSugestoes = async () => {
    try {
      const { data, error } = await supabase
        .from('sugestoes_tecnologia')
        .select(`
          *,
          profiles:criado_por_id (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSugestoes(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar sugestões",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchProjetos = async () => {
    try {
      const { data, error } = await supabase
        .from('projetos_tecnologia')
        .select(`
          *,
          profiles:responsavel_id (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjetos(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar projetos",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchAnexos = async (projetoId: string) => {
    try {
      const { data, error } = await supabase
        .from('anexos_projeto_tec')
        .select('*')
        .eq('projeto_id', projetoId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Erro ao carregar anexos",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  };

  const createSugestao = async (sugestaoData: Omit<SugestaoTecnologia, 'id' | 'created_at' | 'updated_at' | 'criado_por_id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('sugestoes_tecnologia')
        .insert({
          ...sugestaoData,
          criado_por_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Sugestão criada com sucesso!",
        description: "Sua sugestão foi enviada para avaliação.",
      });

      fetchSugestoes();
      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao criar sugestão",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateSugestaoStatus = async (id: string, status: SugestaoTecnologia['status']) => {
    try {
      const { error } = await supabase
        .from('sugestoes_tecnologia')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status atualizado!",
        description: `Sugestão marcada como ${status}.`,
      });

      fetchSugestoes();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createProjeto = async (projetoData: Omit<ProjetoTecnologia, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('projetos_tecnologia')
        .insert(projetoData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Projeto criado com sucesso!",
        description: "O projeto foi adicionado ao sistema.",
      });

      fetchProjetos();
      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao criar projeto",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateProjeto = async (id: string, updates: Partial<ProjetoTecnologia>) => {
    try {
      const { error } = await supabase
        .from('projetos_tecnologia')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Projeto atualizado!",
        description: "As alterações foram salvas.",
      });

      fetchProjetos();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar projeto",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createAnexo = async (anexoData: Omit<AnexoProjetoTec, 'id' | 'uploaded_at'>) => {
    try {
      const { data, error } = await supabase
        .from('anexos_projeto_tec')
        .insert(anexoData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Anexo adicionado!",
        description: "O arquivo foi vinculado ao projeto.",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar anexo",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      Promise.all([fetchSugestoes(), fetchProjetos()]).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  return {
    sugestoes,
    projetos,
    anexos,
    loading,
    createSugestao,
    updateSugestaoStatus,
    createProjeto,
    updateProjeto,
    createAnexo,
    fetchAnexos,
    refetch: () => {
      fetchSugestoes();
      fetchProjetos();
    },
  };
}