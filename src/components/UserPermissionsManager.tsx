import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { usePermissions } from "@/hooks/usePermissions";
import { useToast } from "@/components/ui/use-toast";

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

const ROLES = [
  { value: 'admin', label: 'Administrador', description: 'Acesso total a todas as funcionalidades' },
  { value: 'manager', label: 'Gerente', description: 'Acesso amplo com algumas restrições' },
  { value: 'member', label: 'Membro', description: 'Acesso básico para trabalho diário' },
  { value: 'guest', label: 'Convidado', description: 'Acesso limitado apenas para visualização' }
];

export function UserPermissionsManager() {
  const { userPermissions, updateUserPermissions, DEFAULT_PERMISSIONS } = usePermissions();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState(userPermissions?.role || 'member');
  const [customPermissions, setCustomPermissions] = useState<string[]>(
    userPermissions?.permissions || DEFAULT_PERMISSIONS.member
  );

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setCustomPermissions(DEFAULT_PERMISSIONS[role as keyof typeof DEFAULT_PERMISSIONS]);
  };

  const handlePermissionToggle = (permission: string) => {
    setCustomPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = async () => {
    const result = await updateUserPermissions(selectedRole as any, customPermissions);
    if (!result.error) {
      toast({
        title: "Permissões atualizadas!",
        description: "Suas permissões foram atualizadas com sucesso.",
      });
    }
  };

  const getPermissionLabel = (permission: string) => {
    const [module, action] = permission.split(':');
    const moduleLabel = MODULES.find(m => m.key === module)?.label || module;
    const actionLabel = action === 'read' ? 'Visualizar' : 'Editar';
    return `${moduleLabel} - ${actionLabel}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Permissões</h2>
        <p className="text-gray-600 mt-2">Configure suas permissões de acesso ao sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seleção de Role */}
        <Card>
          <CardHeader>
            <CardTitle>Função do Usuário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma função" />
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

            <div className="text-sm text-gray-600">
              <strong>Função atual:</strong> {ROLES.find(r => r.value === selectedRole)?.label}
            </div>
          </CardContent>
        </Card>

        {/* Permissões Customizadas */}
        <Card>
          <CardHeader>
            <CardTitle>Permissões Específicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MODULES.map((module) => (
                <div key={module.key} className="space-y-2">
                  <h4 className="font-medium text-gray-900">{module.label}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${module.key}:read`}
                        checked={customPermissions.includes(`${module.key}:read`)}
                        onCheckedChange={() => handlePermissionToggle(`${module.key}:read`)}
                      />
                      <label htmlFor={`${module.key}:read`} className="text-sm">
                        Visualizar
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${module.key}:write`}
                        checked={customPermissions.includes(`${module.key}:write`)}
                        onCheckedChange={() => handlePermissionToggle(`${module.key}:write`)}
                      />
                      <label htmlFor={`${module.key}:write`} className="text-sm">
                        Editar
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Permissões Atuais */}
      <Card>
        <CardHeader>
          <CardTitle>Permissões Atuais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {customPermissions.map((permission) => (
              <Badge key={permission} variant="secondary">
                {getPermissionLabel(permission)}
              </Badge>
            ))}
          </div>
          {customPermissions.length === 0 && (
            <p className="text-gray-500">Nenhuma permissão selecionada</p>
          )}
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-4">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Salvar Permissões
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            setSelectedRole(userPermissions?.role || 'member');
            setCustomPermissions(userPermissions?.permissions || DEFAULT_PERMISSIONS.member);
          }}
        >
          Restaurar Padrão
        </Button>
      </div>
    </div>
  );
} 