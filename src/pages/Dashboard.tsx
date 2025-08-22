import { Layout } from "@/components/Layout";
import { KPICard } from "@/components/KPICard";
import { EventCard } from "@/components/EventCard";
import { TaskTable } from "@/components/TaskTable";
import { TrendingUp, Calendar, CheckSquare } from "lucide-react";

// Mock data
const kpiData = [
  { title: "Projetos Ativos", value: "1" },
  { title: "Eventos Próximos", value: "3" },
  { title: "Tarefas Pendentes", value: "5" }
];

const recentEvents = [
  { id: "1", title: "Baile Black 100 Limites - Tiradentes", date: "2025-07-12", status: "Planejado" as const, organizer: "Equipe 100 Limites" },
  { id: "2", title: "Baile Black 100 Limites - Itaim Paulista", date: "2025-07-12", status: "Planejado" as const, organizer: "Equipe 100 Limites" },
  { id: "3", title: "Batalha All Style", date: "2025-07-12", status: "Planejado" as const, organizer: "Equipe 100 Limites" },
  { id: "4", title: "Batalha de Rima", date: "2025-07-12", status: "Planejado" as const, organizer: "Equipe 100 Limites" },
];

const recentTasks = [
  { id: "1", title: "Editar e subir os vídeos da última Black", status: "Em Andamento" as const, deadline: "2025-07-12", assignee: "Sayllon Santos" },
  { id: "2", title: "Editar as últimas fotos", status: "A Fazer" as const, deadline: "2025-07-12", assignee: "Dedih Antunes" },
  { id: "3", title: "Criar coreografia para o próximo evento", status: "A Fazer" as const, deadline: "2025-07-12", assignee: "Wesley dos Santos" },
  { id: "4", title: "Confirmar datas de próximos eventos", status: "A Fazer" as const, deadline: "2025-07-12", assignee: "Wellington Vieira" },
  { id: "5", title: "Regravar música", status: "A Fazer" as const, deadline: "2025-07-12", assignee: "Guilherme" },
];

const finances = [
  { id: "1", title: "Contrato Baile Black Itaim Paulista", date: "2025-07-12", amount: 800.00, positive: true },
  { id: "2", title: "Manutenção do Studio", date: "2025-07-12", amount: 200.00, positive: false },
  { id: "3", title: "Contrato Baile Black Tiradentes", date: "2025-07-12", amount: 800.00, positive: true },
  { id: "4", title: "Investimento Raposo", date: "2025-07-12", amount: 100.00, positive: false },
];


function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export default function Dashboard() {
  const userName = "Sayllon"; // simulando login

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-1000 ">DashBoard</h1><br></br>
          <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}, {userName}!</h1>
          <p className="text-gray-600">Aqui está um resumo do que está acontecendo com seus projetos.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Eventos + Tarefas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Eventos */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Eventos Próximos</h2>
            <div className="divide-y">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-800">{event.title}</p>
                  </div>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tarefas */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tarefas Pendentes</h2>
            <ul className="space-y-3">
              {recentTasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800 font-medium">{task.title}</p>
                    <span className="text-sm text-gray-500">{task.assignee}</span>
                  </div>
                  <span className="text-sm text-gray-500">{task.deadline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Finanças */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Finanças Recentes</h2>
          <div className="divide-y">
            {finances.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-2">
                  <span className={`h-4 w-1 rounded ${item.positive ? "bg-green-500" : "bg-red-500"}`} />
                  <p className="text-gray-800">{item.title}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <span className="font-semibold">{item.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
