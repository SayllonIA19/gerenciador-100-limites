import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Expense = Tables<'expenses'>;
type ExpenseInsert = TablesInsert<'expenses'>;
type ExpenseUpdate = TablesUpdate<'expenses'>;

type Revenue = Tables<'revenues'>;
type RevenueInsert = TablesInsert<'revenues'>;
type RevenueUpdate = TablesUpdate<'revenues'>;

export function useFinance() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch expenses
  const fetchExpenses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('expenses')
        .select(`
          *,
          projects!inner(user_id)
        `)
        .eq('projects.user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        throw error;
      }

      setExpenses(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar despesas",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Fetch revenues
  const fetchRevenues = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('revenues')
        .select(`
          *,
          projects!inner(user_id)
        `)
        .eq('projects.user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        throw error;
      }

      setRevenues(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar receitas",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Create expense
  const createExpense = async (expenseData: Omit<ExpenseInsert, 'user_id'>) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return { error: new Error("Usuário não autenticado") };
    }

    try {
      const newExpense: ExpenseInsert = {
        ...expenseData,
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from('expenses')
        .insert(newExpense)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setExpenses(prev => [data, ...prev]);
      toast({
        title: "Despesa criada!",
        description: "Sua despesa foi registrada com sucesso.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao criar despesa",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Create revenue
  const createRevenue = async (revenueData: Omit<RevenueInsert, 'user_id'>) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return { error: new Error("Usuário não autenticado") };
    }

    try {
      const newRevenue: RevenueInsert = {
        ...revenueData,
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from('revenues')
        .insert(newRevenue)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setRevenues(prev => [data, ...prev]);
      toast({
        title: "Receita criada!",
        description: "Sua receita foi registrada com sucesso.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao criar receita",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Update expense
  const updateExpense = async (id: string, updates: ExpenseUpdate) => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setExpenses(prev => 
        prev.map(expense => 
          expense.id === id ? data : expense
        )
      );

      toast({
        title: "Despesa atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar despesa",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Update revenue
  const updateRevenue = async (id: string, updates: RevenueUpdate) => {
    try {
      const { data, error } = await supabase
        .from('revenues')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setRevenues(prev => 
        prev.map(revenue => 
          revenue.id === id ? data : revenue
        )
      );

      toast({
        title: "Receita atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar receita",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Delete expense
  const deleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setExpenses(prev => prev.filter(expense => expense.id !== id));
      toast({
        title: "Despesa excluída!",
        description: "A despesa foi removida com sucesso.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao excluir despesa",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Delete revenue
  const deleteRevenue = async (id: string) => {
    try {
      const { error } = await supabase
        .from('revenues')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setRevenues(prev => prev.filter(revenue => revenue.id !== id));
      toast({
        title: "Receita excluída!",
        description: "A receita foi removida com sucesso.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao excluir receita",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Load data on mount and when user changes
  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchExpenses(), fetchRevenues()]).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  const totalRevenues = revenues.reduce((sum, revenue) => sum + (revenue.amount || 0), 0);
  const balance = totalRevenues - totalExpenses;

  return {
    expenses,
    revenues,
    loading,
    totalExpenses,
    totalRevenues,
    balance,
    fetchExpenses,
    fetchRevenues,
    createExpense,
    createRevenue,
    updateExpense,
    updateRevenue,
    deleteExpense,
    deleteRevenue,
  };
} 