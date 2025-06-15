
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-6 pt-20 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
