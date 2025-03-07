
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface BlogHeaderProps {
  onCreatePost: () => void;
  isEditing: boolean;
}

const BlogHeader = ({ onCreatePost, isEditing }: BlogHeaderProps) => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">Blog Management</h1>
        <p className="text-muted-foreground">
          Logged in as {user.name} ({isAdmin() ? "Admin" : "Editor"})
        </p>
      </div>
      
      <div className="flex gap-2">
        {!isEditing && (
          <Button onClick={onCreatePost} className="flex items-center gap-2">
            <Plus size={16} />
            Add New Post
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => navigate("/blog")}
        >
          View Blog
        </Button>
      </div>
    </div>
  );
};

export default BlogHeader;
