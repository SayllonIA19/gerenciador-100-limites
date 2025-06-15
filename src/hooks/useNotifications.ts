
import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  type: 'event' | 'feed' | 'task' | 'project' | 'finance' | 'collaborator';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'event',
    title: 'Novo Evento Criado',
    message: 'Workshop de Integração da Equipe foi agendado para amanhã',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    actionUrl: '/events/2'
  },
  {
    id: '2',
    type: 'task',
    title: 'Tarefa Atribuída',
    message: 'Você foi atribuído à tarefa: Preparar slides da apresentação',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: false,
    actionUrl: '/events/1'
  },
  {
    id: '3',
    type: 'feed',
    title: 'Nova Postagem no Feed',
    message: 'João Silva postou uma atualização sobre o evento de lançamento',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: false,
    actionUrl: '/feed'
  },
  {
    id: '4',
    type: 'finance',
    title: 'Pagamento Recebido',
    message: 'Contrato do evento de lançamento foi pago',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    actionUrl: '/finance'
  }
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getUnreadCountByType = (type: Notification['type']) => {
    return notifications.filter(n => n.type === type && !n.read).length;
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return {
    notifications,
    unreadCount,
    getUnreadCountByType,
    markAsRead,
    markAllAsRead,
    addNotification
  };
}
