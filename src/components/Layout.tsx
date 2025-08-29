import { Sidebar } from "./Sidebar";
import { NotificationDropdown } from "./NotificationDropdown";
import { UserMenu } from "./UserMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
<<<<<<< Updated upstream
      <main className="flex-1 lg:ml-0 overflow-auto">

=======
      <main className="flex-1 lg:ml-0 flex flex-col">
>>>>>>> Stashed changes
        <div className="flex justify-end items-center gap-2 p-4 bg-white border-b lg:hidden">
          <NotificationDropdown />
          <UserMenu />
        </div>
        <div className="hidden lg:flex justify-end items-center gap-2 p-4 bg-white border-b">
          <NotificationDropdown />
          <UserMenu />
        </div>
        <div className="flex-1 p-6 pt-2 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
