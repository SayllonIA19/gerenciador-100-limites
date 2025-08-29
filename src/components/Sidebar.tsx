import { useState } from "react";
<<<<<<< Updated upstream
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FolderOpen,
  DollarSign,
  MessageSquare,
  Users,
  FileText,
  Menu,
  X,
  Megaphone,
  Music,
  Zap,
  Code
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationBadge } from "./NotificationBadge";
import logo100 from '@/assets/img/login/logo.png';
=======
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
>>>>>>> Stashed changes

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  permission: string; // Permissão necessária para ver esta aba
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
      </svg>
    ),
    permission: "dashboard:read"
  },
  {
    title: "Projetos",
    href: "/projects",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    permission: "projects:read"
  },
  {
    title: "Colaboradores",
    href: "/collaborators",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    permission: "collaborators:read"
  },
  {
    title: "Eventos",
    href: "/events",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    permission: "events:read"
  },
  {
    title: "Finanças",
    href: "/finance",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    permission: "finance:read"
  },
  {
    title: "Marketing",
    href: "/marketing",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    permission: "marketing:read"
  },
  {
    title: "Música",
    href: "/music",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    permission: "music:read"
  },
  {
    title: "Dança",
    href: "/dance",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
      </svg>
    ),
    permission: "dance:read"
  },
  {
    title: "Mapas Visuais",
    href: "/visual-maps",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    permission: "visual:read"
  }
];

const technologyItems = [
  { name: "Sugestões", href: "/tecnologia/sugestoes", icon: MessageSquare },
  { name: "Projetos", href: "/tecnologia/projetos", icon: FolderOpen },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { canRead, loading } = usePermissions();

  // Exibir todos os itens, sem filtrar por permissão
  const filteredNavItems = navItems;

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <div className="flex items-center justify-center h-16 px-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
<<<<<<< Updated upstream
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#111] rounded-md shadow-md"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-[#111] bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#111] text-white transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-center h-50 bg-[#111] cursor-pointer pt-6">
          <img
            src={logo100}
            alt="Logo 100 Limites"
            className="w-40 mx-auto object-contain"
          />
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors relative",
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
                {item.notificationType && (
                  <NotificationBadge
                    count={getUnreadCountByType(item.notificationType)}
                    className="ml-auto"
                  />
                )}
              </NavLink>
            ))}
            
            {/* Technology Section */}
            <div className="mt-6">
              <div className="flex items-center px-4 py-2">
                <Code className="mr-3 h-5 w-5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Tecnologia
                </span>
              </div>
              <div className="mt-2 space-y-1">
                {technologyItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-4 py-2 ml-4 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      )
                    }
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
=======
    <div className={cn(
      "flex flex-col h-screen bg-gray-900 text-white transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">100</span>
            </div>
            <span className="font-semibold text-lg">Limites</span>
>>>>>>> Stashed changes
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="ml-3 truncate">{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-400 text-center">
            Sistema de Gerenciamento
          </div>
        </div>
      )}
    </div>
  );
}
