import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { usePermissions } from "@/hooks/usePermissions";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Shield, User, Save, RefreshCw } from "lucide-react";

const ROLES = [
  { value: 'admin', label: 'Administrador', description: 'Acesso total' },
  { value: 'manager', label: 'Gerente', description: 'Acesso amplo' },
  { value: 'member', label: 'Membro', description: 'Acesso básico' },
  { value: 'guest', label: 'Convidado', description: 'Acesso limitado' }
];

const MODULES = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'projects', label: 'Projetos' },
  { key: 'collaborators', label: 'Colaboradores' },
  { key: 'events', label: 'Eventos' },
  { key: 'tasks', label: 'Tarefas' },
  { key: 'finance', label: 'Finanças' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'music', label: 'Música' },
  { key: 'dance', label: 'Dança' },
  { key: 'visual', label: 'Mapas Visuais' }
];

export default function Admin() {
  const { isAdmin, loading } = usePermissions();
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<string>('member');
  const [customPermissions, setCustomPermissions] = useState<string[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Verificar se é administrador
  if (!isAdmin()) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Shield className="h-5 w-5" />
                Acesso Negado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Você precisa ser administrador para acessar esta página.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Carregar usuários
  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('email');

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar usuários",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  // Selecionar usuário
  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setCustomPermissions(user.permissions || []);
  };

  // Atualizar permissões
  const handleUpdatePermissions = async () => {
    if (!selectedUser) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({
          role: selectedRole,
          permissions: customPermissions
        })
        .eq('id', selectedUser.id);

      if (error) throw error;

      toast({
        title: "Permissões atualizadas!",
        description: "As permissões foram salvas com sucesso.",
      });

      // Recarregar usuários
      loadUsers();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar permissões",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Alternar permissão
  const togglePermission = (permission: string) => {
    setCustomPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  // Carregar usuários na montagem
  useState(() => {
    loadUsers();
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administração</h1>
            <p className="text-gray-600 mt-2">Gerencie permissões de usuários</p>
          </div>
          <Button onClick={loadUsers} disabled={loadingUsers}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loadingUsers ? 'animate-spin' : ''}`} />
            Recarregar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Usuários */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Usuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingUsers ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Carregando usuários...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedUser?.id === user.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleSelectUser(user)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {user.role}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {user.permissions?.length || 0} permissões
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Editor de Permissões */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Permissões
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedUser ? (
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Usuário: {selectedUser.email}</p>
                  </div>

                  {/* Seleção de Role */}
                  <div>
                    <label className="text-sm font-medium">Função</label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            <div>
                              <div className="font-medium">{role.label}</div>
                              <div className="text-sm text-gray-500">{role.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Permissões por Módulo */}
                  <div>
                    <label className="text-sm font-medium">Permissões Específicas</label>
                    <div className="mt-2 space-y-3">
                      {MODULES.map((module) => (
                        <div key={module.key} className="space-y-2">
                          <h4 className="font-medium text-sm">{module.label}</h4>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`${module.key}:read`}
                                checked={customPermissions.includes(`${module.key}:read`)}
                                onCheckedChange={() => togglePermission(`${module.key}:read`)}
                              />
                              <label htmlFor={`${module.key}:read`} className="text-sm">
                                Visualizar
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`${module.key}:write`}
                                checked={customPermissions.includes(`${module.key}:write`)}
                                onCheckedChange={() => togglePermission(`${module.key}:write`)}
                              />
                              <label htmlFor={`${module.key}:write`} className="text-sm">
                                Editar
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botão Salvar */}
                  <Button onClick={handleUpdatePermissions} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Permissões
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Selecione um usuário para editar suas permissões
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
} 