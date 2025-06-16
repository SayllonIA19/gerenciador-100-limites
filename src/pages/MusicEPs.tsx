
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Disc, Calendar, Music } from "lucide-react";

// Mock data para EPs
const eps = [
  {
    id: "1",
    title: "Midnight Vibes EP",
    releaseDate: "2024-05-01",
    tracks: ["Sunset Dreams", "Ocean Waves", "City Lights"],
    coverArt: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Electric Dreams EP",
    releaseDate: "2024-07-15",
    tracks: ["Electric Nights", "Neon Glow"],
    coverArt: "/placeholder.svg"
  }
];

export default function MusicEPs() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">EPs</h1>
            <p className="text-gray-600 mt-2">Gerencie seus EPs e compilações</p>
          </div>
          <Button onClick={() => console.log("Novo EP")}>
            <Plus className="h-4 w-4 mr-2" />
            Novo EP
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eps.map((ep) => (
            <Card key={ep.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-md">
                    <Disc className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{ep.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Lançamento: {ep.releaseDate}</span>
                </div>

                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Music className="h-4 w-4 mr-2" />
                    <span>Faixas ({ep.tracks.length}):</span>
                  </div>
                  <div className="space-y-1">
                    {ep.tracks.map((track, index) => (
                      <div key={index} className="text-sm text-gray-700 pl-4">
                        {index + 1}. {track}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Detalhes
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
