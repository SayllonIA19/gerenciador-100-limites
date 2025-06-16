
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Target, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data para campanhas de marketing
const marketingCampaigns = [
  {
    id: "1",
    title: "Campanha de Lançamento do Produto",
    objective: "Aumentar awareness do novo produto entre o público-alvo",
    relatedEvent: "Evento de Lançamento do Produto",
    status: "Em produção",
    strategist: "João Silva",
    startDate: "2024-06-15",
    endDate: "2024-07-15",
    tasksCount: 8,
    completedTasks: 3
  },
  {
    id: "2",
    title: "Campanha Workshop de Integração",
    objective: "Promover inscrições para o workshop",
    relatedEvent: "Workshop de Integração da Equipe",
    status: "Planejamento",
    strategist: "Maria Santos",
    startDate: "2024-06-20",
    endDate: "2024-06-30",
    tasksCount: 5,
    completedTasks: 1
  }
];

const statusColors = {
  "Planejamento": "bg-yellow-100 text-yellow-800",
  "Em produção": "bg-blue-100 text-blue-800",
  "Publicado": "bg-green-100 text-green-800",
  "Concluído": "bg-gray-100 text-gray-800"
};

export default function Marketing() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing</h1>
            <p className="text-gray-600 mt-2">Gerencie campanhas de marketing e suas tarefas</p>
          </div>
          <Button onClick={() => console.log("Nova campanha")}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketingCampaigns.map((campaign) => (
            <Card 
              key={campaign.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/marketing/campaigns/${campaign.id}`)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                  <Badge className={statusColors[campaign.status as keyof typeof statusColors]}>
                    {campaign.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">{campaign.objective}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{campaign.startDate} - {campaign.endDate}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Target className="h-4 w-4 mr-2" />
                    <span>{campaign.relatedEvent}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{campaign.strategist}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Progresso das Tarefas</span>
                    <span className="font-medium">{campaign.completedTasks}/{campaign.tasksCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(campaign.completedTasks / campaign.tasksCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
