
import { Sidebar } from "./Sidebar";
import { NotificationDropdown } from "./NotificationDropdown";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="flex justify-end p-4 bg-white border-b lg:hidden">
          <NotificationDropdown />
        </div>
        <div className="hidden lg:flex justify-end p-4 bg-white border-b">
          <NotificationDropdown />
        </div>
        <div className="p-6 pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
