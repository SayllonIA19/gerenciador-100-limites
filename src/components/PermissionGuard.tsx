import { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock } from 'lucide-react';

interface PermissionGuardProps {
  children: ReactNode;
  permission: string; // Ex: 'projects:read' ou 'events:write'
  fallback?: ReactNode;
  showAlert?: boolean;
}

export function PermissionGuard({ 
  children, 
  permission, 
  fallback,
  showAlert = true 
}: PermissionGuardProps) {
  const { canRead, canWrite, loading } = usePermissions();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  // Verificar se tem permissão de leitura ou escrita
  const hasAccess = canRead(permission.split(':')[0]) || canWrite(permission.split(':')[0]);

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (showAlert) {
      return (
        <div className="flex items-center justify-center h-64">
          <Alert className="max-w-md">
            <Lock className="h-4 w-4" />
            <AlertDescription>
              Você não tem permissão para acessar esta área.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return null;
  }

  return <>{children}</>;
}

// Componente específico para proteção de escrita
interface WritePermissionGuardProps {
  children: ReactNode;
  module: string; // Ex: 'projects', 'events'
  fallback?: ReactNode;
}

export function WritePermissionGuard({ children, module, fallback }: WritePermissionGuardProps) {
  const { canWrite, loading } = usePermissions();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!canWrite(module)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex items-center justify-center h-64">
        <Alert className="max-w-md">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Você não tem permissão para modificar dados nesta área.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
} 