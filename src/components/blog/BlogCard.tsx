
import React from "react";
import { CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const excerpt = post.subtitle || (post.content_blocks || [])
    .find(block => block.type === 'paragraph')?.['text']?.substring(0, 150) || '';

  // Function to determine category color
  const getCategoryColor = (category: string) => {
    const cat = category.toLowerCase();
    switch (cat) {
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
      <div className="relative h-56 overflow-hidden group">
        <img
          src={post.main_image_url || '/placeholder.svg'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`${getCategoryColor(post.category)} text-xs px-3 py-1 rounded-full`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 line-clamp-2 h-14">{post.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          {post.published_at && (
            <div className="flex items-center mr-4">
              <CalendarDays size={14} className="mr-1" />
              <span>{formatDate(post.published_at)}</span>
            </div>
          )}
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{post.read_time} min read</span>
          </div>
        </div>
        
        <div className="flex items-center justify-end">
          <Link 
            to={`/blog/${post.slug}`} 
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
