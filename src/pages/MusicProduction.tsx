
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Disc, Album, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MusicProduction() {
  const navigate = useNavigate();

  const stats = [
    { title: "Faixas Totais", value: "24", icon: Music, color: "bg-blue-500" },
    { title: "EPs Lançados", value: "3", icon: Disc, color: "bg-green-500" },
    { title: "Álbuns", value: "1", icon: Album, color: "bg-purple-500" },
    { title: "Em Produção", value: "7", icon: TrendingUp, color: "bg-orange-500" }
  ];

  const menuItems = [
    {
      title: "Faixas Musicais",
      description: "Gerencie todas as suas faixas musicais",
      href: "/music/tracks",
      icon: Music,
      count: "24 faixas"
    },
    {
      title: "EPs",
      description: "Visualize e organize seus EPs",
      href: "/music/eps",
      icon: Disc,
      count: "3 EPs"
    },
    {
      title: "Álbuns",
      description: "Gerencie seus álbuns completos",
      href: "/music/albums",
      icon: Album,
      count: "1 álbum"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produção Musical</h1>
          <p className="text-gray-600 mt-2">Gerencie o ciclo de vida das suas faixas musicais</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-md ${stat.color} text-white`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card 
              key={item.title}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(item.href)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-md">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-gray-500">{item.count}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
                <Button variant="outline" className="mt-4 w-full">
                  Acessar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
