import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export type Permission = 
  | 'dashboard:read'
  | 'dashboard:write'
  | 'projects:read'
  | 'projects:write'
  | 'collaborators:read'
  | 'collaborators:write'
  | 'events:read'
  | 'events:write'
  | 'tasks:read'
  | 'tasks:write'
  | 'finance:read'
  | 'finance:write'
  | 'marketing:read'
  | 'marketing:write'
  | 'music:read'
  | 'music:write'
  | 'dance:read'
  | 'dance:write'
  | 'visual:read'
  | 'visual:write';

export type UserRole = 'admin' | 'manager' | 'member' | 'guest';

interface UserPermissions {
  role: UserRole;
  permissions: Permission[];
}

// Permissões padrão por role
const DEFAULT_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'dashboard:read', 'dashboard:write',
    'projects:read', 'projects:write',
    'collaborators:read', 'collaborators:write',
    'events:read', 'events:write',
    'tasks:read', 'tasks:write',
    'finance:read', 'finance:write',
    'marketing:read', 'marketing:write',
    'music:read', 'music:write',
    'dance:read', 'dance:write',
    'visual:read', 'visual:write'
  ],
  manager: [
    'dashboard:read',
    'projects:read', 'projects:write',
    'collaborators:read',
    'events:read', 'events:write',
    'tasks:read', 'tasks:write',
    'finance:read',
    'marketing:read', 'marketing:write',
    'music:read', 'music:write',
    'dance:read', 'dance:write',
    'visual:read', 'visual:write'
  ],
  member: [
    'dashboard:read',
    'projects:read',
    'events:read',
    'tasks:read', 'tasks:write',
    'finance:read',
    'marketing:read',
    'music:read',
    'dance:read',
    'visual:read'
  ],
  guest: [
    'dashboard:read',
    'projects:read',
    'events:read',
    'tasks:read',
    'finance:read'
  ]
};

export function usePermissions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userPermissions, setUserPermissions] = useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState(true);

  // Buscar permissões do usuário
  const fetchUserPermissions = async () => {
    if (!user) {
      setUserPermissions(null);
      setLoading(false);
      return;
    }

    try {
      // Primeiro, verificar se o usuário existe na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role, permissions')
        .eq('id', user.id)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        // Se não existe na tabela users, criar com permissões padrão
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            role: 'member',
            permissions: DEFAULT_PERMISSIONS.member
          })
          .select('role, permissions')
          .single();

        if (createError) {
          throw createError;
        }

        setUserPermissions({
          role: newUser.role,
          permissions: newUser.permissions || DEFAULT_PERMISSIONS.member
        });
      } else if (userData) {
        setUserPermissions({
          role: userData.role,
          permissions: userData.permissions || DEFAULT_PERMISSIONS[userData.role]
        });
      }
    } catch (error: any) {
      console.error('Erro ao buscar permissões:', error);
      toast({
        title: "Erro ao carregar permissões",
        description: error.message,
        variant: "destructive",
      });
      // Fallback para permissões padrão
      setUserPermissions({
        role: 'member',
        permissions: DEFAULT_PERMISSIONS.member
      });
    } finally {
      setLoading(false);
    }
  };

  // Verificar se usuário tem permissão específica
  const hasPermission = (permission: Permission): boolean => {
    if (!userPermissions) return false;
    return userPermissions.permissions.includes(permission);
  };

  // Verificar se usuário tem permissão de leitura para um módulo
  const canRead = (module: string): boolean => {
    return hasPermission(`${module}:read` as Permission);
  };

  // Verificar se usuário tem permissão de escrita para um módulo
  const canWrite = (module: string): boolean => {
    return hasPermission(`${module}:write` as Permission);
  };

  // Verificar se usuário é admin
  const isAdmin = (): boolean => {
    return userPermissions?.role === 'admin';
  };

  // Verificar se usuário é manager ou admin
  const isManagerOrAdmin = (): boolean => {
    return userPermissions?.role === 'admin' || userPermissions?.role === 'manager';
  };

  // Atualizar permissões do usuário
  const updateUserPermissions = async (role: UserRole, permissions: Permission[]) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          role,
          permissions
        });

      if (error) throw error;

      setUserPermissions({ role, permissions });
      toast({
        title: "Permissões atualizadas!",
        description: "As permissões foram atualizadas com sucesso.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar permissões",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Carregar permissões quando usuário mudar
  useEffect(() => {
    fetchUserPermissions();
  }, [user]);

  return {
    userPermissions,
    loading,
    hasPermission,
    canRead,
    canWrite,
    isAdmin,
    isManagerOrAdmin,
    updateUserPermissions,
    fetchUserPermissions,
    DEFAULT_PERMISSIONS
  };
} 