import { usePermissions } from "@/hooks/usePermissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Edit, User } from "lucide-react";

export function PermissionsViewer() {
  const { userPermissions, loading, isAdmin, isManagerOrAdmin } = usePermissions();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando permissões...</p>
        </div>
      </div>
    );
  }

  if (!userPermissions) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permissões do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Nenhuma permissão encontrada.</p>
        </CardContent>
      </Card>
    );
  }

  const modules = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'projects', label: 'Projetos', icon: '📁' },
    { key: 'collaborators', label: 'Colaboradores', icon: '👥' },
    { key: 'events', label: 'Eventos', icon: '📅' },
    { key: 'tasks', label: 'Tarefas', icon: '✅' },
    { key: 'finance', label: 'Finanças', icon: '💰' },
    { key: 'marketing', label: 'Marketing', icon: '📢' },
    { key: 'music', label: 'Música', icon: '🎵' },
    { key: 'dance', label: 'Dança', icon: '💃' },
    { key: 'visual', label: 'Mapas Visuais', icon: '🗺️' }
  ];

  const getPermissionStatus = (module: string) => {
    const canRead = userPermissions.permissions.includes(`${module}:read`);
    const canWrite = userPermissions.permissions.includes(`${module}:write`);
    
    if (canWrite) return { status: 'full', label: 'Acesso Total', color: 'bg-green-100 text-green-800' };
    if (canRead) return { status: 'read', label: 'Só Leitura', color: 'bg-blue-100 text-blue-800' };
    return { status: 'none', label: 'Sem Acesso', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="space-y-6">
      {/* Informações do Usuário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Função</p>
              <p className="font-medium capitalize">{userPermissions.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Permissões</p>
              <p className="font-medium">{userPermissions.permissions.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nível de Acesso</p>
              <Badge variant={isAdmin() ? "default" : isManagerOrAdmin() ? "secondary" : "outline"}>
                {isAdmin() ? "Administrador" : isManagerOrAdmin() ? "Gerente" : "Usuário"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissões por Módulo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permissões por Módulo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => {
              const permission = getPermissionStatus(module.key);
              return (
                <div key={module.key} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{module.icon}</span>
                    <h4 className="font-medium">{module.label}</h4>
                  </div>
                  <Badge className={permission.color}>
                    {permission.status === 'full' && <Edit className="h-3 w-3 mr-1" />}
                    {permission.status === 'read' && <Eye className="h-3 w-3 mr-1" />}
                    {permission.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista Detalhada */}
      <Card>
        <CardHeader>
          <CardTitle>Permissões Detalhadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {userPermissions.permissions.map((permission) => {
              const [module, action] = permission.split(':');
              const moduleInfo = modules.find(m => m.key === module);
              return (
                <div key={permission} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <span>{moduleInfo?.icon}</span>
                    <span className="font-medium">{moduleInfo?.label}</span>
                    <span className="text-gray-500">-</span>
                    <span className="text-sm">
                      {action === 'read' ? 'Visualizar' : 'Editar'}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {permission}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 