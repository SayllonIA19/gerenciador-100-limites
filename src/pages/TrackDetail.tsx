
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Music2, Clock, Users, Megaphone, Play, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data para faixa específica
const trackData = {
  id: "1",
  title: "Sunset Dreams",
  status: "Lançado",
  bpm: 120,
  key: "Am",
  deliveryDate: "2024-05-15",
  artists: ["João Silva", "Maria Santos"],
  attachments: [
    { name: "sunset_dreams_demo.mp3", type: "Demonstração" },
    { name: "sunset_dreams_final.wav", type: "Tronco" },
    { name: "letra_sunset_dreams.txt", type: "Letra da música" }
  ]
};

const statusColors = {
  "Ideia": "bg-gray-100 text-gray-800",
  "Composição": "bg-yellow-100 text-yellow-800", 
  "Produção": "bg-blue-100 text-blue-800",
  "Misturando": "bg-purple-100 text-purple-800",
  "Dominado": "bg-orange-100 text-orange-800",
  "Lançado": "bg-green-100 text-green-800"
};

export default function TrackDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const createMarketingCampaign = () => {
    // Esta função seria implementada para criar uma nova campanha de marketing
    console.log("Criar campanha de marketing para:", trackData.title);
    // Navegar para formulário de criação de campanha com dados pré-preenchidos
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/music/tracks')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Faixas
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{trackData.title}</h1>
              <p className="text-gray-600 mt-2">Detalhes da Faixa Musical</p>
            </div>
          </div>
          <Badge className={statusColors[trackData.status as keyof typeof statusColors]}>
            {trackData.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Faixa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Music2 className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-500">BPM</span>
                      </div>
                      <p className="text-gray-900 font-bold text-xl">{trackData.bpm}</p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Music2 className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-500">Tom</span>
                      </div>
                      <p className="text-gray-900 font-bold text-xl">{trackData.key}</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Data de Entrega</span>
                    </div>
                    <p className="text-gray-900">{trackData.deliveryDate}</p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Artistas</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trackData.artists.map((artist, index) => (
                        <Badge key={index} variant="outline">
                          {artist}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anexos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trackData.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-sm text-gray-500">{attachment.type}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Ouvir
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={createMarketingCampaign}
                >
                  <Megaphone className="h-4 w-4 mr-2" />
                  Criar Campanha de Marketing
                </Button>
                <Button variant="outline" className="w-full">
                  Editar Informações
                </Button>
                <Button variant="outline" className="w-full">
                  Adicionar Anexo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-green-500 pl-3">
                    <p className="font-medium">Faixa lançada</p>
                    <p className="text-gray-500">15 de maio, 2024</p>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-3">
                    <p className="font-medium">Masterização concluída</p>
                    <p className="text-gray-500">10 de maio, 2024</p>
                  </div>
                  <div className="border-l-2 border-yellow-500 pl-3">
                    <p className="font-medium">Produção iniciada</p>
                    <p className="text-gray-500">1 de abril, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
