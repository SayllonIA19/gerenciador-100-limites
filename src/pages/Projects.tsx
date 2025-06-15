
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, User, Calendar } from "lucide-react";
import { useState } from "react";

// Mock data
const projects = [
  { id: "1", name: "Redesign do Website", description: "Reformulação completa do website da empresa", status: "Ativo", owner: "João Silva", createdDate: "2024-05-01", progress: 65 },
  { id: "2", name: "Desenvolvimento de App Mobile", description: "App nativo para iOS e Android", status: "Ativo", owner: "Maria Santos", createdDate: "2024-04-15", progress: 40 },
  { id: "3", name: "Campanha de Marketing Q2", description: "Campanha de marketing digital e redes sociais", status: "Concluído", owner: "Pedro Johnson", createdDate: "2024-03-01", progress: 100 },
  { id: "4", name: "Pesquisa de Produto", description: "Pesquisa de mercado para nova linha de produtos", status: "Em Espera", owner: "Ana Wilson", createdDate: "2024-05-20", progress: 25 },
  { id: "5", name: "Integração de Sistema", description: "Integração do novo sistema CRM", status: "Ativo", owner: "Carlos Brown", createdDate: "2024-06-01", progress: 80 }
];

const statusColors = {
  "Ativo": "bg-green-100 text-green-800",
  "Em Espera": "bg-yellow-100 text-yellow-800",
  "Concluído": "bg-blue-100 text-blue-800"
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
            <p className="text-gray-600 mt-2">Gerencie e acompanhe todos os seus projetos</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Em Espera">Em Espera</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-500 flex items-center">
              Mostrando {filteredProjects.length} de {projects.length} projetos
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{project.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{project.owner}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Criado em {project.createdDate}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progresso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum projeto encontrado que corresponda aos seus critérios.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
