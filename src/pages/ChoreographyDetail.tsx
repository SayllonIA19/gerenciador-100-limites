
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, Calendar, Users, Music, ExternalLink, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data para coreografia específica
const choreographyData = {
  id: "1",
  title: "Dança Contemporânea - Outono",
  description: "Uma peça expressiva que retrata as mudanças da estação através de movimentos fluidos e transições suaves",
  musicLink: "https://music.example.com/autumn-piece",
  performanceDate: "2024-07-15",
  relatedEvent: "Festival de Dança 2024",
  dancers: ["Alice Brown", "Bob Wilson", "Carol Davis"],
  materials: ["video_referencia.mp4", "partitura_movimento.pdf", "conceito_visual.jpg"]
};

const rehearsals = [
  { id: "1", date: "2024-06-20 19:00", location: "Estúdio A", notes: "Foco nos movimentos de abertura" },
  { id: "2", date: "2024-06-22 19:00", location: "Estúdio A", notes: "Trabalhar transições do meio" },
  { id: "3", date: "2024-06-25 19:00", location: "Estúdio B", notes: "Ensaio completo com música" }
];

export default function ChoreographyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dance/choreographies')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Coreografias
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{choreographyData.title}</h1>
              <p className="text-gray-600 mt-2">Detalhes da Coreografia</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Coreografia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Zap className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Descrição</span>
                    </div>
                    <p className="text-gray-900">{choreographyData.description}</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Data da Apresentação</span>
                    </div>
                    <p className="text-gray-900">{choreographyData.performanceDate}</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Music className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Música</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900">Link da música</span>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Abrir
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Dançarinos</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {choreographyData.dancers.map((dancer, index) => (
                        <Badge key={index} variant="outline">
                          {dancer}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Cronograma de Ensaios</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Ensaio
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rehearsals.map((rehearsal) => (
                    <div key={rehearsal.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{rehearsal.date}</span>
                        </div>
                        <Badge variant="outline">{rehearsal.location}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{rehearsal.notes}</p>
                    </div>
                  ))}
                </div>
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
                  <p className="font-medium">{choreographyData.relatedEvent}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Detalhes do Evento
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Materiais de Referência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {choreographyData.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{material}</span>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Material
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total de Ensaios</span>
                  <span className="font-medium">{rehearsals.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Dançarinos</span>
                  <span className="font-medium">{choreographyData.dancers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Dias até Apresentação</span>
                  <span className="font-medium">25</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
