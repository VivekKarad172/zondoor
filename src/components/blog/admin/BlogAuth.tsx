
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/blog/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";

interface BlogAuthProps {
  children: React.ReactNode;
}

const BlogAuth = ({ children }: BlogAuthProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="wesmarc-container section-padding">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Blog Management</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Button>
        </div>
        
        <LoginForm />
      </div>
    );
  }

  return <>{children}</>;
};

export default BlogAuth;
