
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Zap, Calendar, Users, Music, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data para coreografias
const choreographies = [
  {
    id: "1",
    title: "Dança Contemporânea - Outono",
    description: "Uma peça expressiva que retrata as mudanças da estação",
    musicLink: "https://music.example.com/autumn-piece",
    performanceDate: "2024-07-15",
    relatedEvent: "Festival de Dança 2024",
    dancers: ["Alice Brown", "Bob Wilson", "Carol Davis"],
    rehearsalCount: 8
  },
  {
    id: "2",
    title: "Jazz Fusion",
    description: "Mistura energética de jazz com elementos modernos",
    musicLink: "https://music.example.com/jazz-fusion",
    performanceDate: "2024-08-01",
    relatedEvent: null,
    dancers: ["David Miller", "Eva Garcia"],
    rehearsalCount: 5
  }
];

export default function DanceChoreographies() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Coreografias</h1>
            <p className="text-gray-600 mt-2">Gerencie todas as suas coreografias</p>
          </div>
          <Button onClick={() => console.log("Nova coreografia")}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Coreografia
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {choreographies.map((choreography) => (
            <Card 
              key={choreography.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/dance/choreographies/${choreography.id}`)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-purple-600" />
                    {choreography.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">{choreography.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Apresentação: {choreography.performanceDate}</span>
                  </div>
                  
                  {choreography.relatedEvent && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{choreography.relatedEvent}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{choreography.dancers.length} dançarinos</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Dançarinos:</p>
                  <div className="flex flex-wrap gap-1">
                    {choreography.dancers.map((dancer, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {dancer}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t flex justify-between">
                  <Button variant="outline" size="sm">
                    <Music className="h-4 w-4 mr-1" />
                    Música
                  </Button>
                  <Badge variant="secondary">
                    {choreography.rehearsalCount} ensaios
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
