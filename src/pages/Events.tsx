
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Calendar, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const events = [
  { id: "1", title: "Evento de Lançamento do Produto", date: "2024-06-20", status: "Planejado" as const, organizer: "João Silva", location: "Auditório A" },
  { id: "2", title: "Workshop de Integração da Equipe", date: "2024-06-18", status: "Em Andamento" as const, organizer: "Maria Santos", location: "Escritório" },
  { id: "3", title: "Apresentação para Cliente", date: "2024-06-15", status: "Concluído" as const, organizer: "Pedro Johnson", location: "Escritório do Cliente" },
  { id: "4", title: "Revisão da Campanha de Marketing", date: "2024-07-02", status: "Planejado" as const, organizer: "Ana Wilson", location: "Sala de Reunião B" },
  { id: "5", title: "Revisão Trimestral", date: "2024-06-30", status: "Planejado" as const, organizer: "Carlos Brown", location: "Sala de Diretoria" },
  { id: "6", title: "Sessão de Treinamento", date: "2024-05-15", status: "Concluído" as const, organizer: "Lisa Garcia", location: "Centro de Treinamento" }
];

const statusColors = {
  "Planejado": "bg-blue-100 text-blue-800",
  "Em Andamento": "bg-yellow-100 text-yellow-800",
  "Concluído": "bg-green-100 text-green-800",
  "Cancelado": "bg-red-100 text-red-800"
};

export default function Events() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const eventMonth = new Date(event.date).getMonth();
    const currentMonth = new Date().getMonth();
    const matchesMonth = monthFilter === "all" || 
      (monthFilter === "current" && eventMonth === currentMonth) ||
      (monthFilter === "next" && eventMonth === currentMonth + 1);
    
    return matchesSearch && matchesStatus && matchesMonth;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
            <p className="text-gray-600 mt-2">Gerencie e acompanhe todos os seus eventos</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar eventos..."
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
                <SelectItem value="Planejado">Planejado</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={monthFilter} onValueChange={setMonthFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Meses</SelectItem>
                <SelectItem value="current">Mês Atual</SelectItem>
                <SelectItem value="next">Próximo Mês</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-500 flex items-center">
              Mostrando {filteredEvents.length} de {events.length} eventos
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="divide-y divide-gray-200">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <Badge className={statusColors[event.status]}>
                    {event.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {event.organizer}
                  </div>
                  {event.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum evento encontrado que corresponda aos seus critérios.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
