import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Download } from "lucide-react";
import { useState } from "react";
import { CollaboratorModal } from "@/components/CollaboratorModal";

// Mock data
const effectiveCollaborators = [
  {
    id: "1",
    fullName: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    function: "Lead Photographer",
    shirtSize: "M",
    pantsSize: "32",
    shoeSize: "8",
    notes: "Specializes in event photography and has 5+ years experience.",
    documents: ["portfolio.pdf", "contract.pdf"],
    photo: null
  },
  {
    id: "2",
    fullName: "Bob Martinez",
    email: "bob.martinez@email.com",
    phone: "+1 (555) 234-5678",
    function: "Sound Engineer",
    shirtSize: "L",
    pantsSize: "34",
    shoeSize: "10",
    notes: "Expert in live sound mixing and has worked on major events.",
    documents: ["certification.pdf"],
    photo: null
  },
  {
    id: "3",
    fullName: "Carol Chen",
    email: "carol.chen@email.com",
    phone: "+1 (555) 345-6789",
    function: "Event Coordinator",
    shirtSize: "S",
    pantsSize: "28",
    shoeSize: "7",
    notes: "Experienced in managing large-scale corporate events.",
    documents: ["resume.pdf", "references.pdf"],
    photo: null
  }
];

const participantCollaborators = [
  {
    id: "4",
    fullName: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    function: "Freelance Videographer",
    shirtSize: "XL",
    pantsSize: "36",
    shoeSize: "11",
    notes: "Drone pilot license and 4K video production specialist.",
    documents: ["drone_license.pdf", "showreel.mp4"],
    photo: null
  },
  {
    id: "5",
    fullName: "Eva Rodriguez",
    email: "eva.rodriguez@email.com",
    phone: "+1 (555) 567-8901",
    function: "External Catering Manager",
    shirtSize: "M",
    pantsSize: "30",
    shoeSize: "8",
    notes: "Food safety certified and specializes in dietary accommodations.",
    documents: ["food_safety_cert.pdf"],
    photo: null
  }
];

function CollaboratorCard({ collaborator, onExport, onClick }: { 
  collaborator: any, 
  onExport: () => void,
  onClick: () => void 
}) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center space-x-4" onClick={onClick}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={collaborator.photo} />
          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
            {collaborator.fullName.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-gray-900">{collaborator.fullName}</h3>
          <Badge variant="secondary" className="mt-1">{collaborator.function}</Badge>
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={(e) => {
          e.stopPropagation();
          onExport();
        }}
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  );
}

export default function Collaborators() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allCollaborators = [...effectiveCollaborators, ...participantCollaborators];
  const filteredEffective = effectiveCollaborators.filter(collaborator =>
    collaborator.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.function.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredParticipants = participantCollaborators.filter(collaborator =>
    collaborator.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.function.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = (collaborator: any) => {
    // This would generate and download a file with collaborator information
    console.log('Exporting collaborator:', collaborator.fullName);
  };

  const handleCollaboratorClick = (collaborator: any) => {
    setSelectedCollaborator(collaborator);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Collaborators</h1>
            <p className="text-gray-600 mt-2">Manage your team of external collaborators</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Collaborator
          </Button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search collaborators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              Showing {filteredEffective.length + filteredParticipants.length} of {allCollaborators.length} collaborators
            </div>
          </div>
        </div>

        {/* Effective Collaborators */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-700">Effective Collaborators</CardTitle>
            <p className="text-sm text-gray-600">Team members who are part of the company</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredEffective.map((collaborator) => (
              <CollaboratorCard 
                key={collaborator.id} 
                collaborator={collaborator}
                onExport={() => handleExport(collaborator)}
                onClick={() => handleCollaboratorClick(collaborator)}
              />
            ))}
            {filteredEffective.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No effective collaborators found.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Participant Collaborators */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-700">Participant Collaborators</CardTitle>
            <p className="text-sm text-gray-600">External collaborators participating in projects</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredParticipants.map((collaborator) => (
              <CollaboratorCard 
                key={collaborator.id} 
                collaborator={collaborator}
                onExport={() => handleExport(collaborator)}
                onClick={() => handleCollaboratorClick(collaborator)}
              />
            ))}
            {filteredParticipants.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No participant collaborators found.
              </div>
            )}
          </CardContent>
        </Card>

        <CollaboratorModal 
          collaborator={selectedCollaborator}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </Layout>
  );
}
