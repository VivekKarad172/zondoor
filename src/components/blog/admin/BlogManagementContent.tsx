import React, { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";
import BlogPostsList from "@/components/blog/BlogPostsList";
import BlogHeader from "./BlogHeader";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface BlogManagementContentProps {
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const BlogManagementContent = ({ posts, setPosts }: BlogManagementContentProps) => {
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Create a new post - navigate to editor
  const handleCreatePost = () => {
    if (!user) return;
    navigate('/admin/blog/new');
  };

  // Delete post
  const handleDeletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(posts.filter((post) => post.id !== id));
      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  // Edit post - navigate to editor
  const handleEditPost = (post: BlogPost) => {
    navigate(`/admin/blog/${post.id}`);
  };

  return (
    <>
      <BlogHeader 
        onCreatePost={handleCreatePost} 
        isEditing={false} 
      />

      <BlogPostsList 
        posts={posts} 
        onEdit={handleEditPost} 
        onDelete={handleDeletePost}
        currentUser={user}
        isAdmin={isAdmin()}
      />
    </>
  );
};

export default BlogManagementContent;
