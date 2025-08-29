import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Mail, Phone, MapPin, User } from "lucide-react";
import { useCollaborators } from "@/hooks/useCollaborators";
import { CollaboratorModal } from "@/components/CollaboratorModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const roleColors = {
  "admin": "bg-red-100 text-red-800",
  "manager": "bg-blue-100 text-blue-800",
  "member": "bg-green-100 text-green-800",
  "guest": "bg-gray-100 text-gray-800"
};

const roleLabels = {
  "admin": "Administrador",
  "manager": "Gerente",
  "member": "Membro",
  "guest": "Convidado"
};

export default function Collaborators() {
  const { collaborators, loading, deleteCollaborator } = useCollaborators();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState<any>(null);

  const filteredCollaborators = collaborators.filter(collaborator => {
    const matchesSearch = collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (collaborator.email && collaborator.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === "all" || collaborator.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleEditCollaborator = (collaborator: any) => {
    setSelectedCollaborator(collaborator);
    setIsModalOpen(true);
  };

  const handleDeleteCollaborator = async (collaboratorId: string) => {
    if (confirm("Tem certeza que deseja excluir este colaborador?")) {
      await deleteCollaborator(collaboratorId);
    }
  };

  const handleAddCollaborator = () => {
    setSelectedCollaborator(null);
    setIsModalOpen(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando colaboradores...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Colaboradores</h1>
            <p className="text-gray-600 mt-2">Gerencie sua equipe e colaboradores</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleAddCollaborator}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Colaborador
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar colaboradores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Funções</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="manager">Gerente</SelectItem>
                <SelectItem value="member">Membro</SelectItem>
                <SelectItem value="guest">Convidado</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-500 flex items-center">
              Mostrando {filteredCollaborators.length} de {collaborators.length} colaboradores
            </div>
          </div>
        </div>

        {/* Collaborators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollaborators.map((collaborator) => (
            <Card key={collaborator.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={collaborator.avatar_url || undefined} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {getInitials(collaborator.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{collaborator.name}</CardTitle>
                    <Badge className={roleColors[collaborator.role as keyof typeof roleColors]}>
                      {roleLabels[collaborator.role as keyof typeof roleLabels]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {collaborator.email && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{collaborator.email}</span>
                  </div>
                )}
                
                {collaborator.phone && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Phone className="h-4 w-4" />
                    <span>{collaborator.phone}</span>
                  </div>
                )}
                
                {collaborator.location && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{collaborator.location}</span>
                  </div>
                )}

                {collaborator.created_at && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>Adicionado em {format(new Date(collaborator.created_at), 'dd/MM/yyyy', { locale: ptBR })}</span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditCollaborator(collaborator)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteCollaborator(collaborator.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCollaborators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {collaborators.length === 0 
                ? "Nenhum colaborador encontrado. Adicione seu primeiro colaborador!" 
                : "Nenhum colaborador encontrado que corresponda aos seus critérios."
              }
            </p>
          </div>
        )}

        {/* Modal */}
        <CollaboratorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          collaborator={selectedCollaborator}
        />
      </div>
    </Layout>
  );
}
