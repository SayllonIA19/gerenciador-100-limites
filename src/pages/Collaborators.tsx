
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Mail, Phone, FileText } from "lucide-react";
import { useState } from "react";

// Mock data
const collaborators = [
  {
    id: "1",
    fullName: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    function: "Photographer",
    shirtSize: "M",
    pantsSize: "32",
    shoeSize: "8",
    notes: "Specializes in event photography and has 5+ years experience.",
    documents: ["portfolio.pdf", "contract.pdf"]
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
    documents: ["certification.pdf"]
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
    documents: ["resume.pdf", "references.pdf"]
  },
  {
    id: "4",
    fullName: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    function: "Videographer",
    shirtSize: "XL",
    pantsSize: "36",
    shoeSize: "11",
    notes: "Drone pilot license and 4K video production specialist.",
    documents: ["drone_license.pdf", "showreel.mp4"]
  },
  {
    id: "5",
    fullName: "Eva Rodriguez",
    email: "eva.rodriguez@email.com",
    phone: "+1 (555) 567-8901",
    function: "Catering Manager",
    shirtSize: "M",
    pantsSize: "30",
    shoeSize: "8",
    notes: "Food safety certified and specializes in dietary accommodations.",
    documents: ["food_safety_cert.pdf"]
  }
];

export default function Collaborators() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCollaborators = collaborators.filter(collaborator =>
    collaborator.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.function.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Showing {filteredCollaborators.length} of {collaborators.length} collaborators
            </div>
          </div>
        </div>

        {/* Collaborators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollaborators.map((collaborator) => (
            <Card key={collaborator.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{collaborator.fullName}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {collaborator.function}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{collaborator.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{collaborator.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Shirt</p>
                    <p className="font-medium">{collaborator.shirtSize}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pants</p>
                    <p className="font-medium">{collaborator.pantsSize}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Shoes</p>
                    <p className="font-medium">{collaborator.shoeSize}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Notes</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{collaborator.notes}</p>
                </div>

                {collaborator.documents.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Documents</p>
                    <div className="space-y-1">
                      {collaborator.documents.slice(0, 2).map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                          <FileText className="h-3 w-3" />
                          <span>{doc}</span>
                        </div>
                      ))}
                      {collaborator.documents.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{collaborator.documents.length - 2} more documents
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCollaborators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No collaborators found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
