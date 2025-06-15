
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const events = [
  { id: "1", title: "Product Launch Event", date: "2024-06-20", status: "Planned" as const, organizer: "John Doe", location: "Conference Hall A" },
  { id: "2", title: "Team Building Workshop", date: "2024-06-18", status: "In Progress" as const, organizer: "Jane Smith", location: "Office" },
  { id: "3", title: "Client Presentation", date: "2024-06-15", status: "Completed" as const, organizer: "Mike Johnson", location: "Client Office" },
  { id: "4", title: "Marketing Campaign Review", date: "2024-07-02", status: "Planned" as const, organizer: "Sarah Wilson", location: "Meeting Room B" },
  { id: "5", title: "Quarterly Review", date: "2024-06-30", status: "Planned" as const, organizer: "David Brown", location: "Boardroom" },
  { id: "6", title: "Training Session", date: "2024-05-15", status: "Completed" as const, organizer: "Lisa Garcia", location: "Training Center" }
];

export default function Events() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const eventMonth = new Date(event.date).getMonth();
    const currentMonth = new Date().getMonth();
    const matchesMonth = monthFilter === "all" || 
      (monthFilter === "current" && eventMonth === currentMonth) ||
      (monthFilter === "next" && eventMonth === currentMonth + 1);
    
    return matchesSearch && matchesStatus && matchesMonth;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600 mt-2">Manage and track all your events</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={monthFilter} onValueChange={setMonthFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="next">Next Month</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-500 flex items-center">
              Showing {filteredEvents.length} of {events.length} events
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onClick={() => navigate(`/events/${event.id}`)} 
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
