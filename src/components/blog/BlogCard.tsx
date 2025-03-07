
import React from "react";
import { CalendarDays, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "./BlogData";
import { formatDate } from "./blogUtils";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  // Function to determine category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "product":
        return "bg-primary/10 text-primary";
      case "design":
        return "bg-purple-100 text-purple-600";
      case "maintenance":
        return "bg-blue-100 text-blue-600";
      case "guide":
        return "bg-green-100 text-green-600";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`${getCategoryColor(post.category)} text-xs px-3 py-1 rounded-full`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 line-clamp-2 h-14">{post.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center mr-4">
            <CalendarDays size={14} className="mr-1" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              <User size={16} />
            </div>
            <span className="text-sm font-medium">{post.author}</span>
          </div>
          <Link 
            to={`/blog/${post.id}`} 
            className="text-primary font-medium text-sm hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
