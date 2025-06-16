
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Album, Calendar, Music } from "lucide-react";

// Mock data para álbuns
const albums = [
  {
    id: "1",
    title: "Journey Through Sound",
    releaseDate: "2024-08-01",
    tracks: [
      "Sunset Dreams", "Ocean Waves", "City Lights", "Electric Nights", 
      "Neon Glow", "Midnight Hour", "Dawn Breaking", "Final Destination"
    ],
    coverArt: "/placeholder.svg"
  }
];

export default function MusicAlbums() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Álbuns</h1>
            <p className="text-gray-600 mt-2">Gerencie seus álbuns completos</p>
          </div>
          <Button onClick={() => console.log("Novo álbum")}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Álbum
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <Card key={album.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-md">
                    <Album className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{album.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Lançamento: {album.releaseDate}</span>
                </div>

                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Music className="h-4 w-4 mr-2" />
                    <span>Faixas ({album.tracks.length}):</span>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {album.tracks.map((track, index) => (
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
