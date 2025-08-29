import { Layout } from "@/components/Layout";
<<<<<<< Updated upstream
import { KPICard } from "@/components/KPICard";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; // ícone de busca

// Mock data
const kpiData = [
  { title: "Projetos Ativos", value: "1" },
  { title: "Eventos Próximos", value: "3" },
  { title: "Tarefas Pendentes", value: "5" }
];

const recentEvents = [
  { id: "1", title: "Baile Black 100 Limites - Tiradentes", date: "12/07/2025" },
  { id: "2", title: "Baile Black 100 Limites - Itaim Paulista", date: "12/07/2025" },
  { id: "3", title: "Batalha All Style", date: "12/07/2025" },
  { id: "4", title: "Batalha de Rima", date: "12/07/2025" },
];

const recentTasks = [
  { id: "1", title: "Editar e subir os vídeos da última Black", deadline: "12/07/2025", assignee: "Sayllon Santos" },
  { id: "2", title: "Editar as últimas fotos", deadline: "12/07/2025", assignee: "Dedih Antunes" },
  { id: "3", title: "Criar coreografia para o próximo evento", deadline: "12/07/2025", assignee: "Wesley dos Santos" },
  { id: "4", title: "Confirmar datas de próximos eventos", deadline: "12/07/2025", assignee: "Wellington Vieira" },
  { id: "5", title: "Regravar música", deadline: "12/07/2025", assignee: "Guilherme" },
];

const finances = [
  { id: "1", title: "Contrato Baile Black Itaim Paulista", date: "12/07/2025", amount: 800.00, positive: true },
  { id: "2", title: "Manutenção do Studio", date: "12/07/2025", amount: 200.00, positive: false },
  { id: "3", title: "Contrato Baile Black Tiradentes", date: "12/07/2025", amount: 800.00, positive: true },
  { id: "4", title: "Investimento Raposo", date: "12/07/2025", amount: 100.00, positive: false },
  { id: "5", title: "Ferramentas Marketing", date: "12/07/2025", amount: 49.90, positive: false },
];
=======
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/hooks/useProjects";
import { useEvents } from "@/hooks/useEvents";
import { useTasks } from "@/hooks/useTasks";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Search, User } from "lucide-react";
import React from "react";
>>>>>>> Stashed changes

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom Dia";
  if (hour < 18) return "Boa Tarde";
  return "Boa Noite";
}

// Placeholder para finanças recentes
const finances = [
  { id: 1, desc: "contrato Baile Black Itaim Paulista", date: "12/07/2025", value: 800, type: "in" },
  { id: 2, desc: "Manutenção do Studio", date: "12/07/2025", value: 200, type: "out" },
  { id: 3, desc: "Contrato Baile Black Tiradentes", date: "12/07/2025", value: 800, type: "in" },
  { id: 4, desc: "Investimento Raposo", date: "12/07/2025", value: 100, type: "in" },
  { id: 5, desc: "Ferramentas Marketing", date: "12/07/2025", value: 49.9, type: "out" },
];

export default function Dashboard() {
<<<<<<< Updated upstream
  const userName = "Sayllon";

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="flex flex-col text-left items-start md:gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-gray-600 text-sm">
              Aqui está um resumo do que está acontecendo com seus projetos.
            </p>
          </div>

          {/* Caixa de Pesquisa */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black text-sm"
            />
          </div>
        </div>



        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-white rounded-lg border p-4 flex flex-col items-center text-center">
              <span className="text-sm text-gray-600">{kpi.title}</span>
              <span className="text-2xl font-semibold">{kpi.value}</span>
            </div>
          ))}
        </div>

        {/* Eventos + Tarefas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Eventos */}
          <div className="bg-white rounded-lg border p-4">
            <h2 className="text-md font-semibold text-gray-900 mb-3">Eventos Próximos</h2>
            <div className="divide-y">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between py-3">
                  <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tarefas */}
          <div className="bg-white rounded-lg border p-4">
            <h2 className="text-md font-semibold text-gray-900 mb-3">Tarefas Pendentes</h2>
            <ul className="space-y-3">
              {recentTasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8" />
                    <div>
                      <p className="text-gray-800 font-medium text-sm">{task.title}</p>
                      <span className="text-xs text-gray-500">{task.assignee}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{task.deadline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Finanças */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="text-md font-semibold text-gray-900 mb-3">Finanças Recentes</h2>
          <div className="divide-y">
            {finances.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-2">
                  <span className={`h-6 w-1 rounded ${item.positive ? "bg-green-500" : "bg-red-500"}`} />
                  <p className="text-gray-700 text-sm">{item.title}</p>
                </div>
                <div className="flex items-center space-x-8">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <span className="font-medium">{item.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
=======
  const { user } = useAuth();
  const { projects = [], loading: projectsLoading } = useProjects();
  const { events = [], loading: eventsLoading } = useEvents();
  const { tasks = [], loading: tasksLoading } = useTasks();

  const loading = projectsLoading || eventsLoading || tasksLoading;

  // KPIs
  const activeProjects = projects.filter((p) => p.status !== "Completed").length;
  const upcomingEvents = events.filter(
    (e) => e.start_date && new Date(e.start_date) > new Date()
  );
  const pendingTasks = tasks.filter((t) => t.status !== "completed").length;

  // Eventos próximos (máx 4)
  const nextEvents = upcomingEvents.slice(0, 4);

  // Tarefas pendentes (máx 5)
  const pendingTasksList = tasks
    .filter((t) => t.status !== "completed")
    .slice(0, 5);

  // Saudação personalizada
  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuário";

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-8 pr-3 py-1.5 rounded border bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              style={{ minWidth: 180 }}
            />
            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          </div>
          <div className="rounded-full bg-gray-200 p-2">
            <User className="h-5 w-5 text-gray-600" />
>>>>>>> Stashed changes
          </div>
        </div>
      </div>

      {/* Saudação e KPIs */}
      <div className="mb-6">
        <div className="text-lg font-semibold">
          {getGreeting()}, {userName}!
        </div>
        <div className="text-gray-500 text-sm mb-4">
          Aqui está o que está acontecendo com seus projetos.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">Projetos Ativos</div>
            <div className="text-2xl font-bold">{activeProjects}</div>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">Eventos Próximos</div>
            <div className="text-2xl font-bold">{nextEvents.length}</div>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">Tarefas Pendentes</div>
            <div className="text-2xl font-bold">{pendingTasks}</div>
          </div>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Eventos Próximos */}
        <div className="bg-white rounded shadow p-4">
          <div className="font-semibold mb-2">Eventos Próximos</div>
          <table className="w-full text-sm">
            <tbody>
              {nextEvents.length === 0 && (
                <tr>
                  <td className="text-gray-400 py-2 text-center" colSpan={2}>
                    Nenhum evento próximo
                  </td>
                </tr>
              )}
              {nextEvents.map((event) => (
                <tr key={event.id} className="border-b last:border-b-0">
                  <td className="py-2 font-medium">{event.title}</td>
                  <td className="py-2 text-right text-gray-500">
                    {event.start_date ? format(new Date(event.start_date), "dd/MM/yyyy", { locale: ptBR }) : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarefas Pendentes */}
        <div className="bg-white rounded shadow p-4">
          <div className="font-semibold mb-2">Tarefas Pendentes</div>
          <ul className="divide-y">
            {pendingTasksList.length === 0 && (
              <li className="text-gray-400 py-2 text-center">Nenhuma tarefa pendente</li>
            )}
            {pendingTasksList.map((task) => (
              <li key={task.id} className="flex items-center gap-2 py-2">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                  {task.assignee?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{task.title}</div>
                  <div className="text-xs text-gray-500">{task.assignee || "-"}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Finanças Recentes */}
      <div className="bg-white rounded shadow p-4">
        <div className="font-semibold mb-2">Finanças Recentes</div>
        <table className="w-full text-sm">
          <tbody>
            {finances.map((f) => (
              <tr key={f.id} className="border-b last:border-b-0">
                <td className="w-1">
                  <div className={`w-1.5 h-6 rounded ${f.type === "in" ? "bg-green-500" : "bg-red-500"}`}></div>
                </td>
                <td className={`py-2 ${f.type === "in" ? "text-green-700 font-semibold italic" : "text-red-700"}`}>
                  {f.desc}
                </td>
                <td className="py-2 text-gray-500 text-right">{f.date}</td>
                <td className="py-2 text-right font-medium">{f.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
