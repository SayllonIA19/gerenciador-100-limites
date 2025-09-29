import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut, Settings, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Estado para edição do perfil
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Sayllon",
    lastName: "Santts",
    birth: "20/08/2025",
    email: "sayllonsantts@100times.com",
    phone: "+55 11 9 1605-2596",
    team: "Marketing",
    manager: "Sayllon Santts",
    role: "Diretor",
  });

  // Mock user data - será substituído por dados reais
  const user = {
    name: "Admin User",
    email: "admin@100limits.com",
    avatar: "./avatar.png", // Placeholder avatar image path
  };

  //função logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // ajuste conforme seu app
    setOpen(false);
    navigate("/login");
  };

  const handleSettings = () => {
    setOpen(false);
  };

  const handleProfile = () => {
    setShowProfileModal(true);
    setOpen(false);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Funções para editar e salvar perfil
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    // Aqui você pode fazer a chamada para salvar no backend
    setIsEditing(false);
  };

  return (
    <>
      {/* Modal detalhado de perfil */}
      {showProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[600px] max-w-[95%] p-6 relative">
            {/* Botão de fechar */}
            <button
              onClick={() => {
                setShowProfileModal(false);
                setIsEditing(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Cabeçalho */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://ui-avatars.com/api/?name=Sayllon+Santts&background=0D8ABC&color=fff"
                alt="avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-500">{profile.role}</p>
              </div>
            </div>

            {/* Informações Pessoais */}
            <div className="border rounded-xl p-4 mb-4">
              <h3 className="font-semibold mb-3">Informações Pessoais</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Primeiro Nome</p>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile.firstName}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500">Segundo Nome</p>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile.lastName}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500">Nascimento</p>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      name="birth"
                      value={profile.birth}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile.birth}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500">E-mail</p>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile.email}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500">Número</p>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Informações de Equipe */}
            <div className="border rounded-xl p-4">
              <h3 className="font-semibold mb-3">Informações de Equipe</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Equipe</p>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      name="team"
                      value={profile.team}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile.team}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500">Gestor da Equipe</p>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      name="manager"
                      value={profile.manager}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile.manager}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500">Minha Função</p>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      name="role"
                      value={profile.role}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile.role}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex justify-center mt-6 gap-2">
              {isEditing ? (
                <>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleSave}
                  >
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleEdit}
                >
                  Editar Perfil
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Menu do usuário */}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{user.name}</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Perfil Detalhado</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={toggleDarkMode}
            className="cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>{isDarkMode ? "Modo Claro" : "Modo Noturno"}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
