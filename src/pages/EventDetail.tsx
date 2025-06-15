
import { Layout } from "@/components/Layout";
import { TaskTable } from "@/components/TaskTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, User, DollarSign, FileText, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data
const eventData = {
  id: "1",
  title: "Product Launch Event",
  date: "2024-06-20 14:00",
  status: "Planned" as const,
  organizer: "John Doe",
  location: "Conference Hall A",
  description: "This is a major product launch event where we will showcase our latest innovations to clients and stakeholders. The event will include presentations, demonstrations, and networking opportunities.",
  hasContract: true,
  contractValue: 15000,
  isValueReceived: false,
  attachments: ["event_proposal.pdf", "venue_contract.pdf", "speaker_list.xlsx"]
};

const eventTasks = [
  { id: "1", title: "Prepare presentation slides", status: "In Progress" as const, deadline: "2024-06-18", assignee: "Alice Brown" },
  { id: "2", title: "Send invitations", status: "Done" as const, deadline: "2024-06-10", assignee: "Bob Wilson" },
  { id: "3", title: "Book catering", status: "To Do" as const, deadline: "2024-06-15", assignee: "Carol Davis" },
  { id: "4", title: "Setup AV equipment", status: "To Do" as const, deadline: "2024-06-19", assignee: "David Miller" }
];

const statusColors = {
  "Planned": "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  "Completed": "bg-green-100 text-green-800",
  "Cancelled": "bg-red-100 text-red-800"
};

export default function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/events')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{eventData.title}</h1>
              <p className="text-gray-600 mt-2">Event Details</p>
            </div>
          </div>
          <Badge className={statusColors[eventData.status]}>
            {eventData.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">{eventData.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{eventData.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Organizer</p>
                      <p className="font-medium">{eventData.organizer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Contract Value</p>
                      <p className="font-medium">${eventData.contractValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-gray-900">{eventData.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskTable 
                  tasks={eventTasks} 
                  onTaskClick={(task) => console.log('Task clicked:', task)} 
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Has Contract</span>
                  <Badge variant={eventData.hasContract ? "default" : "secondary"}>
                    {eventData.hasContract ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Value Received</span>
                  <Badge variant={eventData.isValueReceived ? "default" : "secondary"}>
                    {eventData.isValueReceived ? "Yes" : "Pending"}
                  </Badge>
                </div>
                {!eventData.isValueReceived && (
                  <Button className="w-full" size="sm">
                    Mark as Received
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {eventData.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{attachment}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
