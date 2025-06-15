
import { Layout } from "@/components/Layout";
import { KPICard } from "@/components/KPICard";
import { EventCard } from "@/components/EventCard";
import { TaskTable } from "@/components/TaskTable";
import { DollarSign, TrendingUp, Calendar, CheckSquare } from "lucide-react";

// Mock data
const kpiData = [
  { title: "Total Revenue", value: "$45,230", icon: <DollarSign className="h-6 w-6 text-blue-600" /> },
  { title: "Active Projects", value: "12", icon: <TrendingUp className="h-6 w-6 text-green-600" /> },
  { title: "Upcoming Events", value: "8", icon: <Calendar className="h-6 w-6 text-purple-600" /> },
  { title: "Pending Tasks", value: "24", icon: <CheckSquare className="h-6 w-6 text-orange-600" /> }
];

const recentEvents = [
  { id: "1", title: "Product Launch Event", date: "2024-06-20", status: "Planned" as const, organizer: "John Doe" },
  { id: "2", title: "Team Building Workshop", date: "2024-06-18", status: "In Progress" as const, organizer: "Jane Smith" },
  { id: "3", title: "Client Presentation", date: "2024-06-15", status: "Completed" as const, organizer: "Mike Johnson" }
];

const recentTasks = [
  { id: "1", title: "Prepare presentation slides", status: "In Progress" as const, deadline: "2024-06-20", assignee: "Alice Brown" },
  { id: "2", title: "Send invitations", status: "Done" as const, deadline: "2024-06-18", assignee: "Bob Wilson" },
  { id: "3", title: "Book venue", status: "To Do" as const, deadline: "2024-06-25", assignee: "Carol Davis" }
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your projects.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Events</h2>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={() => console.log('Navigate to event:', event.id)} 
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Tasks</h2>
            <TaskTable 
              tasks={recentTasks} 
              onTaskClick={(task) => console.log('Task clicked:', task)} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
