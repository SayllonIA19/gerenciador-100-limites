
import { Layout } from "@/components/Layout";
import { KPICard } from "@/components/KPICard";
import { EventCard } from "@/components/EventCard";
import { TaskTable } from "@/components/TaskTable";
import { TrendingUp, Calendar, CheckSquare } from "lucide-react";

// Mock data
const kpiData = [
  { title: "Projetos Ativos", value: "12", icon: <TrendingUp className="h-6 w-6 text-green-600" /> },
  { title: "Eventos Próximos", value: "8", icon: <Calendar className="h-6 w-6 text-purple-600" /> },
  { title: "Tarefas Pendentes", value: "24", icon: <CheckSquare className="h-6 w-6 text-orange-600" /> }
];

const recentEvents = [
  { id: "1", title: "Evento de Lançamento do Produto", date: "2024-06-20", status: "Planejado" as const, organizer: "João Silva" },
  { id: "2", title: "Workshop de Integração da Equipe", date: "2024-06-18", status: "Em Andamento" as const, organizer: "Maria Santos" },
  { id: "3", title: "Apresentação para Cliente", date: "2024-06-15", status: "Concluído" as const, organizer: "Pedro Johnson" }
];

const recentTasks = [
  { id: "1", title: "Preparar slides da apresentação", status: "Em Andamento" as const, deadline: "2024-06-20", assignee: "Ana Brown" },
  { id: "2", title: "Enviar convites", status: "Concluído" as const, deadline: "2024-06-18", assignee: "Carlos Wilson" },
  { id: "3", title: "Reservar local", status: "A Fazer" as const, deadline: "2024-06-25", assignee: "Carla Davis" }
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export default function Dashboard() {
  const userName = "Sayllon"; // This would come from user context/auth

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{getGreeting()}, {userName}!</h1>
          <p className="text-gray-600 mt-2">Aqui está o que está acontecendo com seus projetos.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Eventos Recentes</h2>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={() => console.log('Navigate to event:', event.id)} 
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tarefas Recentes</h2>
            <TaskTable 
              tasks={recentTasks} 
              onTaskClick={(task) => console.log('Task clicked:', task)} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
