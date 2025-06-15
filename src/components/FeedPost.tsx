
import { Heart } from "lucide-react";

interface FeedPostProps {
  post: {
    id: string;
    caption: string;
    author: string;
    event: string;
    date: string;
    media?: string[];
  };
}

export function FeedPost({ post }: FeedPostProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
          {post.author.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{post.author}</p>
          <p className="text-xs text-gray-500">{post.date}</p>
        </div>
      </div>
      
      <p className="text-gray-900 mb-4">{post.caption}</p>
      
      {post.media && post.media.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {post.media.slice(0, 4).map((media, index) => (
            <div key={index} className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Mídia {index + 1}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="border-t pt-4">
        <p className="text-sm text-blue-600 font-medium mb-3">Relacionado a: {post.event}</p>
        <div className="flex items-center text-gray-500">
          <button className="flex items-center space-x-2 hover:text-red-500">
            <Heart className="h-5 w-5" />
            <span className="text-sm">Curtir</span>
          </button>
        </div>
      </div>
    </div>
  );
}
