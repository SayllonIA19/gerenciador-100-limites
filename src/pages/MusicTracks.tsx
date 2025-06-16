
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Clock, Music2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data para faixas musicais
const musicTracks = [
  {
    id: "1",
    title: "Sunset Dreams",
    status: "Lançado",
    bpm: 120,
    key: "Am",
    deliveryDate: "2024-05-15",
    artists: ["João Silva", "Maria Santos"]
  },
  {
    id: "2", 
    title: "Electric Nights",
    status: "Produção",
    bpm: 128,
    key: "Cm",
    deliveryDate: "2024-07-01",
    artists: ["Pedro Costa"]
  },
  {
    id: "3",
    title: "Ocean Waves",
    status: "Composição",
    bpm: 95,
    key: "G",
    deliveryDate: "2024-08-15",
    artists: ["Ana Lima", "Carlos Mendes"]
  }
];

const statusColors = {
  "Ideia": "bg-gray-100 text-gray-800",
  "Composição": "bg-yellow-100 text-yellow-800", 
  "Produção": "bg-blue-100 text-blue-800",
  "Misturando": "bg-purple-100 text-purple-800",
  "Dominado": "bg-orange-100 text-orange-800",
  "Lançado": "bg-green-100 text-green-800"
};

export default function MusicTracks() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Faixas Musicais</h1>
            <p className="text-gray-600 mt-2">Gerencie todas as suas faixas musicais</p>
          </div>
          <Button onClick={() => console.log("Nova faixa")}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Faixa
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {musicTracks.map((track) => (
            <Card 
              key={track.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/music/tracks/${track.id}`)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Music2 className="h-5 w-5 mr-2 text-blue-600" />
                    {track.title}
                  </CardTitle>
                  <Badge className={statusColors[track.status as keyof typeof statusColors]}>
                    {track.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">BPM:</span>
                    <span className="ml-2 font-medium">{track.bpm}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Tom:</span>
                    <span className="ml-2 font-medium">{track.key}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Entrega: {track.deliveryDate}</span>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Artistas:</p>
                  <div className="flex flex-wrap gap-1">
                    {track.artists.map((artist, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {artist}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t flex justify-between">
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Ouvir
                  </Button>
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
