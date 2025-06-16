
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskTable } from "@/components/TaskTable";
import { ArrowLeft, Calendar, Target, Users, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data para campanha específica
const campaignData = {
  id: "1",
  title: "Campanha de Lançamento do Produto",
  objective: "Aumentar awareness do novo produto entre o público-alvo através de múltiplos canais de comunicação",
  relatedEvent: "Evento de Lançamento do Produto",
  status: "Em produção",
  strategist: "João Silva",
  startDate: "2024-06-15",
  endDate: "2024-07-15"
};

const marketingTasks = [
  { id: "1", title: "Criar posts para Instagram", status: "Concluído" as const, deadline: "2024-06-18", assignee: "Alice Brown", type: "Postagem social" },
  { id: "2", title: "Produzir vídeo promocional", status: "Em Andamento" as const, deadline: "2024-06-20", assignee: "Bob Wilson", type: "Vídeo" },
  { id: "3", title: "Design de anúncios Facebook", status: "A Fazer" as const, deadline: "2024-06-22", assignee: "Carol Davis", type: "Anúncio" },
  { id: "4", title: "Newsletter de lançamento", status: "A Fazer" as const, deadline: "2024-06-25", assignee: "David Miller", type: "E-mail" }
];

const statusColors = {
  "Planejamento": "bg-yellow-100 text-yellow-800",
  "Em produção": "bg-blue-100 text-blue-800",
  "Publicado": "bg-green-100 text-green-800",
  "Concluído": "bg-gray-100 text-gray-800"
};

export default function MarketingCampaignDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/marketing')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Marketing
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{campaignData.title}</h1>
              <p className="text-gray-600 mt-2">Detalhes da Campanha</p>
            </div>
          </div>
          <Badge className={statusColors[campaignData.status as keyof typeof statusColors]}>
            {campaignData.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Campanha</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Target className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Objetivo</span>
                    </div>
                    <p className="text-gray-900">{campaignData.objective}</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Período</span>
                    </div>
                    <p className="text-gray-900">{campaignData.startDate} - {campaignData.endDate}</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Estrategista</span>
                    </div>
                    <p className="text-gray-900">{campaignData.strategist}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tarefas de Marketing</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Tarefa
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TaskTable 
                  tasks={marketingTasks} 
                  onTaskClick={(task) => console.log('Task clicked:', task)} 
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Evento Relacionado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{campaignData.relatedEvent}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Detalhes do Evento
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total de Tarefas</span>
                  <span className="font-medium">{marketingTasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Concluídas</span>
                  <span className="font-medium">{marketingTasks.filter(t => t.status === 'Concluído').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Em Andamento</span>
                  <span className="font-medium">{marketingTasks.filter(t => t.status === 'Em Andamento').length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
