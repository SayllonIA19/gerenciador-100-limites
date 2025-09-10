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
  Zap,
  Code
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationBadge } from "./NotificationBadge";
import logo100 from '@/assets/img/login/logo.png';
import { url } from "inspector";

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

const technologyItems = [
  { name: "Sugestões", href: "/tecnologia/sugestoes", icon: MessageSquare },
  { name: "Projetos", href: "/tecnologia/projetos", icon: FolderOpen },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // mobile
  const [expanded, setExpanded] = useState(true); // desktop hover
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
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 bg-[#111] text-white transform transition-all duration-300 ease-in-out h-full overflow-y-auto",
          isOpen
            ? "w-64 translate-x-0"
            : "lg:" + (expanded ? "w-64" : "w-16") + " " + (expanded ? "translate-x-0" : "translate-x-0"),
        )}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className={cn(
          "flex items-center justify-center bg-[#111] cursor-pointer pt-6 transition-all duration-300",
          expanded ? "h-24" : "h-16"
        )}>
          <NavLink to="/pages/auth.tsx">
            <img
            src={logo100}
            
            alt="Logo 100 Limites"
            className={cn(
              "mx-auto object-contain transition-all duration-300",
              expanded ? "w-40" : "w-10"
            )}
          />
          </NavLink>
          
        </div>

        <nav className="mt-8">
          <div className="px-2 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-3 text-sm font-medium rounded-lg transition-colors relative",
                    expanded ? "px-4" : "justify-center px-0",
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )
                }
              >
                <item.icon className={cn("h-5 w-5 transition-all", expanded ? "mr-3" : "")} />
                {expanded && item.name}
                {item.notificationType && expanded && (
                  <NotificationBadge
                    count={getUnreadCountByType(item.notificationType)}
                    className="ml-auto"
                  />
                )}
              </NavLink>
            ))}
            {/* Technology Section */}
            <div className={cn("mt-6", !expanded && "flex flex-col items-center")}>
              <div className={cn(
                "flex items-center py-2 transition-all",
                expanded ? "px-4" : "justify-center px-0"
              )}>
                <Code className="mr-3 h-5 w-5 text-slate-400" />
                {expanded && (
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Tecnologia
                  </span>
                )}
              </div>
              <div className={cn("mt-2 space-y-1 w-full")}>
                {technologyItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center py-2 text-sm font-medium rounded-lg transition-colors",
                        expanded ? "px-4" : "justify-center px-0",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      )
                    }
                  >
                    <item.icon className={cn("h-4 w-4 transition-all", expanded ? "mr-3" : "")} />
                    {expanded && item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}