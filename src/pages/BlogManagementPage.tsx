
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { blogPosts, BlogPost } from "@/components/blog/BlogData";
import BlogPostEditor from "@/components/blog/BlogPostEditor";
import BlogPostsList from "@/components/blog/BlogPostsList";
import { Plus } from "lucide-react";
import { AnimateInView } from "@/components/ui/motion";
import { useToast } from "@/hooks/use-toast";

const BlogManagementPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Create a new post
  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Math.max(0, ...posts.map((post) => post.id)) + 1,
      title: "New Blog Post",
      excerpt: "Write a short excerpt for your blog post...",
      content: "<p>Write your content here...</p>",
      date: new Date().toISOString().split("T")[0],
      image: "/placeholder.svg",
      author: "Z-ON DOOR Team",
      category: "product",
      readTime: 3,
    };
    
    setEditing(newPost);
    setIsCreating(true);
  };

  // Save post (both for new and edited posts)
  const handleSavePost = (post: BlogPost) => {
    if (isCreating) {
      setPosts([post, ...posts]);
      toast({
        title: "Success",
        description: "New blog post created successfully!",
      });
    } else {
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
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
    setPosts(posts.filter((post) => post.id !== id));
    toast({
      title: "Success",
      description: "Blog post deleted successfully!",
      variant: "destructive",
    });
  };

  // Edit post
  const handleEditPost = (post: BlogPost) => {
    setEditing(post);
    setIsCreating(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditing(null);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="pt-24 md:pt-28">
        <AnimateInView animation="fade-in">
          <div className="wesmarc-container section-padding">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold">Blog Management</h1>
              {!editing && (
                <Button onClick={handleCreatePost} className="flex items-center gap-2">
                  <Plus size={16} />
                  Add New Post
                </Button>
              )}
              {!editing && (
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/blog")}
                >
                  View Blog
                </Button>
              )}
            </div>

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
              />
            )}
          </div>
        </AnimateInView>
      </div>
      <Footer />
    </div>
  );
};

export default BlogManagementPage;
