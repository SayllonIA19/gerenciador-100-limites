import { useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

<<<<<<< Updated upstream
  // Mock user data - will be replaced with real user data from authentication
  const user = {
    name: "Admin User",
    email: "admin@100limits.com",
    avatar: "./avatar.png", // Placeholder avatar image path
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality when authentication is integrated
    console.log("Logout clicked");
    setOpen(false);
=======
  const handleLogout = async () => {
    try {
      await signOut();
      setOpen(false);
      // Redirecionar para a página de login
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
>>>>>>> Stashed changes
  };

  const handleSettings = () => {
    // TODO: Navigate to settings page
    console.log("Settings clicked");
    setOpen(false);
  };

  const handleAccount = () => {
    setOpen(false);
    navigate('/profile');
  };

  // Se não há usuário, não mostrar o menu
  if (!user) {
    return null;
  }

  const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Usuário';
  const userEmail = user.email || '';

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={userName} />
            <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{userName}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAccount} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Minha Conta</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
