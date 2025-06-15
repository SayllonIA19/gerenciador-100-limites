
import { Calendar, MapPin, User } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  status: "Planned" | "In Progress" | "Completed" | "Cancelled";
  organizer: string;
  location?: string;
}

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const statusColors = {
  "Planned": "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  "Completed": "bg-green-100 text-green-800",
  "Cancelled": "bg-red-100 text-red-800"
};

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[event.status]}`}>
          {event.status}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          {event.date}
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          {event.organizer}
        </div>
        {event.location && (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
        )}
      </div>
    </div>
  );
}
