
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, Eye } from "lucide-react";
import { useState } from "react";

// Mock data
const visualMaps = [
  {
    id: "1",
    title: "Fluxo do Processo de Lançamento",
    type: "Diagrama de Processo",
    embedUrl: "https://miro.com/app/board/example1",
    relatedProject: "Lançamento do Produto",
    relatedEvent: "Evento de Lançamento do Produto",
    createdDate: "2024-06-01"
  },
  {
    id: "2",
    title: "Mapa Mental do Redesign do Website",
    type: "Mapa Mental",
    embedUrl: "https://draw.io/example2",
    relatedProject: "Redesign do Website",
    relatedEvent: null,
    createdDate: "2024-05-15"
  },
  {
    id: "3",
    title: "Fluxograma da Estratégia de Marketing",
    type: "Fluxograma",
    embedUrl: "https://lucidchart.com/example3",
    relatedProject: "Campanha de Marketing Q2",
    relatedEvent: "Início da Campanha",
    createdDate: "2024-04-20"
  },
  {
    id: "4",
    title: "Diagrama da Arquitetura do Sistema",
    type: "Diagrama de Processo",
    embedUrl: "https://draw.io/example4",
    relatedProject: "Integração de Sistema",
    relatedEvent: null,
    createdDate: "2024-06-05"
  },
  {
    id: "5",
    title: "Mapa da Jornada do Usuário",
    type: "Mapa Mental",
    embedUrl: "https://miro.com/app/board/example5",
    relatedProject: "Desenvolvimento de App Mobile",
    relatedEvent: null,
    createdDate: "2024-05-28"
  }
];

const typeColors = {
  "Mapa Mental": "bg-purple-100 text-purple-800",
  "Fluxograma": "bg-blue-100 text-blue-800",
  "Diagrama de Processo": "bg-green-100 text-green-800"
};

export default function VisualMaps() {
  const [selectedMap, setSelectedMap] = useState<typeof visualMaps[0] | null>(null);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mapas Visuais</h1>
            <p className="text-gray-600 mt-2">Gerencie diagramas de projetos, mapas mentais e fluxos de processo</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Novo Mapa
          </Button>
        </div>

        {selectedMap ? (
          /* Map Detail View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Button variant="ghost" onClick={() => setSelectedMap(null)}>
                  ← Voltar aos Mapas
                </Button>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedMap.title}</h2>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={typeColors[selectedMap.type as keyof typeof typeColors]}>
                    {selectedMap.type}
                  </Badge>
                  {selectedMap.relatedProject && (
                    <Badge variant="outline">Projeto: {selectedMap.relatedProject}</Badge>
                  )}
                  {selectedMap.relatedEvent && (
                    <Badge variant="outline">Evento: {selectedMap.relatedEvent}</Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" asChild>
                <a href={selectedMap.embedUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir na Ferramenta Externa
                </a>
              </Button>
            </div>

            {/* Embedded Map */}
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ExternalLink className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Incorporação de Mapa Externo</p>
                    <p className="text-sm text-gray-500">
                      O mapa seria incorporado aqui de: {selectedMap.embedUrl}
                    </p>
                    <Button variant="outline" className="mt-4" asChild>
                      <a href={selectedMap.embedUrl} target="_blank" rel="noopener noreferrer">
                        Ver Mapa Completo
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Maps Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visualMaps.map((map) => (
              <Card key={map.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{map.title}</CardTitle>
                    <Badge className={typeColors[map.type as keyof typeof typeColors]}>
                      {map.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {map.relatedProject && (
                      <div className="text-sm">
                        <span className="text-gray-500">Projeto: </span>
                        <span className="font-medium">{map.relatedProject}</span>
                      </div>
                    )}
                    {map.relatedEvent && (
                      <div className="text-sm">
                        <span className="text-gray-500">Evento: </span>
                        <span className="font-medium">{map.relatedEvent}</span>
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="text-gray-500">Criado: </span>
                      <span>{map.createdDate}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedMap(map)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={map.embedUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!selectedMap && visualMaps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum mapa visual encontrado. Crie seu primeiro mapa para começar!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
