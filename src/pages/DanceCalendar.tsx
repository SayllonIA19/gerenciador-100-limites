
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

// Mock data para eventos de dança
const danceEvents = [
  {
    id: "1",
    title: "Ensaio - Dança Contemporânea",
    type: "rehearsal",
    date: "2024-06-20",
    time: "19:00",
    location: "Estúdio A",
    choreography: "Dança Contemporânea - Outono"
  },
  {
    id: "2",
    title: "Apresentação - Jazz Fusion",
    type: "performance",
    date: "2024-06-22",
    time: "20:00",
    location: "Teatro Principal",
    choreography: "Jazz Fusion"
  },
  {
    id: "3",
    title: "Ensaio - Jazz Fusion",
    type: "rehearsal",
    date: "2024-06-23",
    time: "18:30",
    location: "Estúdio B",
    choreography: "Jazz Fusion"
  },
  {
    id: "4",
    title: "Festival de Dança 2024",
    type: "event",
    date: "2024-07-15",
    time: "19:30",
    location: "Centro Cultural",
    choreography: "Dança Contemporânea - Outono"
  }
];

const eventTypeColors = {
  rehearsal: "bg-blue-100 text-blue-800",
  performance: "bg-purple-100 text-purple-800", 
  event: "bg-green-100 text-green-800"
};

const eventTypeLabels = {
  rehearsal: "Ensaio",
  performance: "Apresentação",
  event: "Evento"
};

export default function DanceCalendar() {
  const groupedEvents = danceEvents.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, typeof danceEvents>);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendário de Dança</h1>
          <p className="text-gray-600 mt-2">Visualize ensaios, apresentações e eventos</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {Object.entries(groupedEvents).map(([date, events]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span>{new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className={eventTypeColors[event.type as keyof typeof eventTypeColors]}>
                            {eventTypeLabels[event.type as keyof typeof eventTypeLabels]}
                          </Badge>
                          <h3 className="font-medium text-gray-900">{event.title}</h3>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1">
                          Coreografia: {event.choreography}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Ensaios</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Apresentações</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Eventos</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
