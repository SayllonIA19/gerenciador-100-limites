
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Calendar, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dance() {
  const navigate = useNavigate();

  const stats = [
    { title: "Coreografias", value: "12", icon: Zap, color: "bg-purple-500" },
    { title: "Ensaios Esta Semana", value: "8", icon: Calendar, color: "bg-blue-500" },
    { title: "Dançarinos Ativos", value: "15", icon: Users, color: "bg-green-500" },
    { title: "Apresentações", value: "5", icon: TrendingUp, color: "bg-orange-500" }
  ];

  const menuItems = [
    {
      title: "Coreografias",
      description: "Gerencie todas as suas coreografias",
      href: "/dance/choreographies",
      icon: Zap,
      count: "12 coreografias"
    },
    {
      title: "Calendário",
      description: "Visualize ensaios e apresentações",
      href: "/dance/calendar",
      icon: Calendar,
      count: "8 eventos esta semana"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Dança</h1>
          <p className="text-gray-600 mt-2">Organize coreografias, ensaios e apresentações</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Card 
              key={item.title}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(item.href)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-md">
                    <item.icon className="h-6 w-6 text-purple-600" />
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
