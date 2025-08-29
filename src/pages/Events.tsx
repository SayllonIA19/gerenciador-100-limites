import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Calendar, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Mock inicial dos eventos
const initialEvents = [
  { id: "1", title: "Baile Black 100 Limites - Itaim Paulista", date: "2025-07-12", type: "Baile Black", location: "Fábrica do Itaim", audience: 220 },
  { id: "2", title: "Baile Black 100 Limites - Tiradentes", date: "2025-07-26", type: "Baile Black", location: "Fábrica da Tiradentes", audience: 140 },
  { id: "3", title: "Batalha de Rima", date: "2025-08-16", type: "Batalha", location: "Fábrica da Tiradentes", audience: 190 },
  { id: "4", title: "Baile Black 100 Limites - Tiradentes", date: "2025-08-30", type: "Baile Black", location: "Fábrica da Tiradentes", audience: 327 },
  { id: "5", title: "Batalha All Style", date: "2025-09-13", type: "Batalha", location: "Fábrica da Tiradentes", audience: 410 },
  { id: "6", title: "Baile Black 100 Limites - Tiradentes", date: "2025-09-27", type: "Baile Black", location: "Fábrica da Tiradentes", audience: 145 },
];

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // controle do modal
  const [open, setOpen] = useState(false);

  // dados do novo evento
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    type: "Baile Black",
    location: "",
    audience: "",
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.audience) return;

    const eventToAdd = {
      id: String(events.length + 1),
      ...newEvent,
      audience: Number(newEvent.audience),
    };

    setEvents([...events, eventToAdd]);
    setNewEvent({ title: "", date: "", type: "Baile Black", location: "", audience: "" });
    setOpen(false);
  };

=======
import { useEvents } from "@/hooks/useEvents";
import { useCollaborators } from "@/hooks/useCollaborators";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusColors = {
  "planned": "bg-blue-100 text-blue-800",
  "in_progress": "bg-yellow-100 text-yellow-800",
  "completed": "bg-green-100 text-green-800",
  "cancelled": "bg-red-100 text-red-800"
};

const statusLabels = {
  "planned": "Planejado",
  "in_progress": "Em Andamento",
  "completed": "Concluído",
  "cancelled": "Cancelado"
};

export default function Events() {
  const navigate = useNavigate();
  const { events, loading, deleteEvent } = useEvents();
  const { collaborators } = useCollaborators();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      await deleteEvent(eventId);
    }
  };

  const getOrganizerName = (organizerId: string) => {
    const collaborator = collaborators.find(c => c.id === organizerId);
    return collaborator ? collaborator.name : "Usuário";
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando eventos...</p>
          </div>
        </div>
      </Layout>
    );
  }

>>>>>>> Stashed changes
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
            <p className="text-gray-600 mt-2">Gerencie e acompanhe todos os seus eventos</p>
          </div>
<<<<<<< Updated upstream
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}>
=======
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/events/new")}
          >
>>>>>>> Stashed changes
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
<<<<<<< Updated upstream
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="Baile Black">Baile Black</SelectItem>
                <SelectItem value="Batalha de Rima">Batalha de Rima</SelectItem>
                <SelectItem value="Batalha de Break">Batalha de Break</SelectItem>
=======
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="planned">Planejado</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
>>>>>>> Stashed changes
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-500 flex items-center">
              Mostrando {filteredEvents.length} de {events.length} eventos
            </div>
          </div>
        </div>

<<<<<<< Updated upstream
        {/* Lista de Eventos */}
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
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
=======
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                <Badge className={statusColors[event.status as keyof typeof statusColors]}>
                  {statusLabels[event.status as keyof typeof statusLabels]}
                </Badge>
              </div>
              
              {event.description && (
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              )}
              
              <div className="space-y-2 text-sm text-gray-500">
                {event.start_date && (
>>>>>>> Stashed changes
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {format(new Date(event.start_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </span>
                  </div>
                )}
                
                {event.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                )}
                
                {event.organizer_id && (
                  <div className="flex items-center">
<<<<<<< Updated upstream
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Público: {event.audience}
                  </div>
                </div>
=======
                    <User className="h-4 w-4 mr-2" />
                    <span>{getOrganizerName(event.organizer_id)}</span>
                  </div>
                )}
>>>>>>> Stashed changes
              </div>

              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  Ver Detalhes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {events.length === 0 
                ? "Nenhum evento encontrado. Crie seu primeiro evento!" 
                : "Nenhum evento encontrado que corresponda aos seus critérios."
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal Novo Evento */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Novo Evento</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Nome do evento"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <Select value={newEvent.type} onValueChange={(val) => setNewEvent({ ...newEvent, type: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo do evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baile Black">Baile Black</SelectItem>
                <SelectItem value="Batalha de Rima">Batalha de Rima</SelectItem>
                <SelectItem value="Batalha de Break">Batalha de Break</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Localização"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Público esperado"
              value={newEvent.audience}
              onChange={(e) => setNewEvent({ ...newEvent, audience: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddEvent}>
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
