import React, { useState, useEffect } from "react";
import { BlogPost } from "@/components/blog/BlogData";
import BlogPostEditor from "@/components/blog/BlogPostEditor";
import BlogPostsList from "@/components/blog/BlogPostsList";
import BlogHeader from "./BlogHeader";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface BlogManagementContentProps {
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const BlogManagementContent = ({ posts, setPosts }: BlogManagementContentProps) => {
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const { user, isAdmin, isAuthorized } = useAuth();

  // Create a new post
  const handleCreatePost = () => {
    if (!user) return;
    
    const newPost: BlogPost = {
      id: Math.max(0, ...posts.map((post) => post.id)) + 1,
      title: "New Blog Post",
      excerpt: "Write a short excerpt for your blog post...",
      content: "<p>Write your content here...</p>",
      date: new Date().toISOString().split("T")[0],
      image: "/placeholder.svg",
      author: user.name,
      authorId: user.id,
      category: "product",
      readTime: 3,
    };
    
    setEditing(newPost);
    setIsCreating(true);
  };

  // Save post (both for new and edited posts)
  const handleSavePost = (post: BlogPost) => {
    // Ensure the post has the current user's ID if it's a new post
    const postToSave = isCreating 
      ? { ...post, authorId: user?.id || "unknown" }
      : post;
      
    if (isCreating) {
      setPosts([postToSave, ...posts]);
      toast({
        title: "Success",
        description: "New blog post created successfully!",
      });
    } else {
      setPosts(posts.map((p) => (p.id === post.id ? postToSave : p)));
      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });
    }
    setEditing(null);
    setIsCreating(false);
  };

  // Delete post
  const handleDeletePost = (id: number) => {
    // Get the post to check authorization
    const postToDelete = posts.find(post => post.id === id);
    
    // Only allow if user is admin or the author of the post
    if (!postToDelete || !isAuthorized(postToDelete.authorId)) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to delete this post",
        variant: "destructive",
      });
      return;
    }
    
    setPosts(posts.filter((post) => post.id !== id));
    toast({
      title: "Success",
      description: "Blog post deleted successfully!",
      variant: "destructive",
    });
  };

  // Edit post
  const handleEditPost = (post: BlogPost) => {
    // Only allow if user is admin or the author of the post
    if (!isAuthorized(post.authorId)) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to edit this post",
        variant: "destructive",
      });
      return;
    }
    
    setEditing(post);
    setIsCreating(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditing(null);
    setIsCreating(false);
  };

  return (
    <>
      <BlogHeader 
        onCreatePost={handleCreatePost} 
        isEditing={Boolean(editing)} 
      />

      {editing ? (
        <BlogPostEditor 
          post={editing} 
          onSave={handleSavePost} 
          onCancel={handleCancel}
          isNew={isCreating}
        />
      ) : (
        <BlogPostsList 
          posts={posts} 
          onEdit={handleEditPost} 
          onDelete={handleDeletePost}
          currentUser={user}
          isAdmin={isAdmin()}
        />
      )}
    </>
  );
};

export default BlogManagementContent;
