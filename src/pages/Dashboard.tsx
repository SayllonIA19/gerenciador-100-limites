import { Layout } from "@/components/Layout";
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

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export default function Dashboard() {
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
