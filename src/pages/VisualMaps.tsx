
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, Eye } from "lucide-react";
import { useState } from "react";

// Mock data
const visualMaps = [
  {
    id: "1",
    title: "Product Launch Process Flow",
    type: "Process Diagram",
    embedUrl: "https://miro.com/app/board/example1",
    relatedProject: "Product Launch",
    relatedEvent: "Product Launch Event",
    createdDate: "2024-06-01"
  },
  {
    id: "2",
    title: "Website Redesign Mind Map",
    type: "Mind Map",
    embedUrl: "https://draw.io/example2",
    relatedProject: "Website Redesign",
    relatedEvent: null,
    createdDate: "2024-05-15"
  },
  {
    id: "3",
    title: "Marketing Strategy Flowchart",
    type: "Flowchart",
    embedUrl: "https://lucidchart.com/example3",
    relatedProject: "Marketing Campaign Q2",
    relatedEvent: "Campaign Kickoff",
    createdDate: "2024-04-20"
  },
  {
    id: "4",
    title: "System Architecture Diagram",
    type: "Process Diagram",
    embedUrl: "https://draw.io/example4",
    relatedProject: "System Integration",
    relatedEvent: null,
    createdDate: "2024-06-05"
  },
  {
    id: "5",
    title: "User Journey Map",
    type: "Mind Map",
    embedUrl: "https://miro.com/app/board/example5",
    relatedProject: "Mobile App Development",
    relatedEvent: null,
    createdDate: "2024-05-28"
  }
];

const typeColors = {
  "Mind Map": "bg-purple-100 text-purple-800",
  "Flowchart": "bg-blue-100 text-blue-800",
  "Process Diagram": "bg-green-100 text-green-800"
};

export default function VisualMaps() {
  const [selectedMap, setSelectedMap] = useState<typeof visualMaps[0] | null>(null);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Visual Maps</h1>
            <p className="text-gray-600 mt-2">Manage project diagrams, mind maps, and process flows</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Map
          </Button>
        </div>

        {selectedMap ? (
          /* Map Detail View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Button variant="ghost" onClick={() => setSelectedMap(null)}>
                  ← Back to Maps
                </Button>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedMap.title}</h2>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={typeColors[selectedMap.type as keyof typeof typeColors]}>
                    {selectedMap.type}
                  </Badge>
                  {selectedMap.relatedProject && (
                    <Badge variant="outline">Project: {selectedMap.relatedProject}</Badge>
                  )}
                  {selectedMap.relatedEvent && (
                    <Badge variant="outline">Event: {selectedMap.relatedEvent}</Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" asChild>
                <a href={selectedMap.embedUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in External Tool
                </a>
              </Button>
            </div>

            {/* Embedded Map */}
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ExternalLink className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">External Map Embed</p>
                    <p className="text-sm text-gray-500">
                      Map would be embedded here from: {selectedMap.embedUrl}
                    </p>
                    <Button variant="outline" className="mt-4" asChild>
                      <a href={selectedMap.embedUrl} target="_blank" rel="noopener noreferrer">
                        View Full Map
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Maps Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visualMaps.map((map) => (
              <Card key={map.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{map.title}</CardTitle>
                    <Badge className={typeColors[map.type as keyof typeof typeColors]}>
                      {map.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {map.relatedProject && (
                      <div className="text-sm">
                        <span className="text-gray-500">Project: </span>
                        <span className="font-medium">{map.relatedProject}</span>
                      </div>
                    )}
                    {map.relatedEvent && (
                      <div className="text-sm">
                        <span className="text-gray-500">Event: </span>
                        <span className="font-medium">{map.relatedEvent}</span>
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="text-gray-500">Created: </span>
                      <span>{map.createdDate}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedMap(map)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={map.embedUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!selectedMap && visualMaps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No visual maps found. Create your first map to get started!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
