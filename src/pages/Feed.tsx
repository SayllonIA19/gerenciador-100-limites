
import { Layout } from "@/components/Layout";
import { FeedPost } from "@/components/FeedPost";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock data
const feedPosts = [
  {
    id: "1",
    caption: "Great progress on the product launch event! The venue is booked and we're finalizing the speaker lineup. Exciting times ahead! 🚀",
    author: "John Doe",
    event: "Product Launch Event",
    date: "2 hours ago",
    media: ["image1.jpg", "image2.jpg"]
  },
  {
    id: "2",
    caption: "Team building workshop was a huge success! Amazing to see everyone collaborating and sharing ideas. The team chemistry is stronger than ever.",
    author: "Jane Smith",
    event: "Team Building Workshop",
    date: "1 day ago",
    media: ["team_photo.jpg"]
  },
  {
    id: "3",
    caption: "Client presentation went incredibly well! They loved our proposal and we're moving forward with the project. Thanks to everyone who contributed to making this possible.",
    author: "Mike Johnson",
    event: "Client Presentation",
    date: "3 days ago"
  },
  {
    id: "4",
    caption: "Behind the scenes of our marketing campaign photoshoot. The creative team is doing an amazing job bringing our vision to life!",
    author: "Sarah Wilson",
    event: "Marketing Campaign Review",
    date: "5 days ago",
    media: ["bts1.jpg", "bts2.jpg", "bts3.jpg", "bts4.jpg"]
  },
  {
    id: "5",
    caption: "Quarterly review meetings are always insightful. Great to reflect on our achievements and plan for the next quarter with clear objectives.",
    author: "David Brown",
    event: "Quarterly Review",
    date: "1 week ago"
  }
];

export default function Feed() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Feed</h1>
            <p className="text-gray-600 mt-2">Stay updated with project activities and team updates</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-8">
          <Button variant="outline">
            Load More Posts
          </Button>
        </div>
      </div>
    </Layout>
  );
}
