import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Event = Tables<'events'>;
type EventInsert = TablesInsert<'events'>;
type EventUpdate = TablesUpdate<'events'>;

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch events
  const fetchEvents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          projects!inner(user_id)
        `)
        .eq('projects.user_id', user.id)
        .order('start_date', { ascending: true });

      if (error) {
        throw error;
      }

      setEvents(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar eventos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create event
  const createEvent = async (eventData: Omit<EventInsert, 'organizer_id'>) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return { error: new Error("Usuário não autenticado") };
    }

    try {
      const newEvent: EventInsert = {
        ...eventData,
        organizer_id: user.id,
      };

      const { data, error } = await supabase
        .from('events')
        .insert(newEvent)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setEvents(prev => [data, ...prev]);
      toast({
        title: "Evento criado!",
        description: "Seu evento foi criado com sucesso.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao criar evento",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Update event
  const updateEvent = async (id: string, updates: EventUpdate) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setEvents(prev => 
        prev.map(event => 
          event.id === id ? data : event
        )
      );

      toast({
        title: "Evento atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar evento",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Delete event
  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setEvents(prev => prev.filter(event => event.id !== id));
      toast({
        title: "Evento excluído!",
        description: "O evento foi removido com sucesso.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao excluir evento",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Get event by ID
  const getEvent = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao carregar evento",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Load events on mount and when user changes
  useEffect(() => {
    fetchEvents();
  }, [user]);

  return {
    events,
    loading,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
  };
} 