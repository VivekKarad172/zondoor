
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { blogPosts, BlogPost } from "@/components/blog/BlogData";
import BlogPostEditor from "@/components/blog/BlogPostEditor";
import BlogPostsList from "@/components/blog/BlogPostsList";
import LoginForm from "@/components/blog/LoginForm";
import { Plus, ArrowLeft } from "lucide-react";
import { AnimateInView } from "@/components/ui/motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const BlogManagementPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, isAuthorized } = useAuth();

  // Load posts on mount
  useEffect(() => {
    // Update document title
    document.title = "Z-ON DOOR | Blog Management";
    
    // Load from localStorage if available, otherwise use the default blogPosts
    const savedPosts = localStorage.getItem("blog_posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(blogPosts);
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("blog_posts", JSON.stringify(posts));
    }
  }, [posts]);

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

  if (!user) {
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
          </AnimateInView>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="pt-24 md:pt-28">
        <AnimateInView animation="fade-in">
          <div className="wesmarc-container section-padding">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Blog Management</h1>
                <p className="text-muted-foreground">
                  Logged in as {user.name} ({isAdmin() ? "Admin" : "Editor"})
                </p>
              </div>
              
              <div className="flex gap-2">
                {!editing && (
                  <Button onClick={handleCreatePost} className="flex items-center gap-2">
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
          </div>
        </AnimateInView>
      </div>
      <Footer />
    </div>
  );
};

export default BlogManagementPage;
