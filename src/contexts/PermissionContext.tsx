import { createContext, useContext, ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface PermissionContextType {
  userPermissions: any;
  loading: boolean;
  hasPermission: (permission: string) => boolean;
  canRead: (module: string) => boolean;
  canWrite: (module: string) => boolean;
  isAdmin: () => boolean;
  isManagerOrAdmin: () => boolean;
  updateUserPermissions: (role: string, permissions: string[]) => Promise<{ error: any }>;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: ReactNode }) {
  const permissionUtils = usePermissions();

  return (
    <PermissionContext.Provider value={permissionUtils}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissionContext() {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissionContext must be used within a PermissionProvider');
  }
  return context;
} 