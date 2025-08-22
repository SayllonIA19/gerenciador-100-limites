
import { useState } from "react";
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
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationBadge } from "./NotificationBadge";
import logo100 from '@/assets/img/login/logo.png';

const navigationItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, notificationType: null },
  { name: "Events", href: "/events", icon: Calendar, notificationType: "event" as const },
  { name: "Projects", href: "/projects", icon: FolderOpen, notificationType: "project" as const },
  { name: "Finance", href: "/finance", icon: DollarSign, notificationType: "finance" as const },
  { name: "Feed", href: "/feed", icon: MessageSquare, notificationType: "feed" as const },
  { name: "Collaborators", href: "/collaborators", icon: Users, notificationType: "collaborator" as const },
  { name: "Visual Maps", href: "/visual-maps", icon: FileText, notificationType: null },
  { name: "Marketing", href: "/marketing", icon: Megaphone, notificationType: null },
  { name: "Music Production", href: "/music", icon: Music, notificationType: null },
  { name: "Dance", href: "/dance", icon: Zap, notificationType: null },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getUnreadCountByType } = useNotifications();

  return (
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
          </div>
        </nav>
      </div>
    </>
  );
}
