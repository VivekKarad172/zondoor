
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/components/blog/BlogData";
import { formatDate } from "@/components/blog/blogUtils";
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react";
import { AnimateInView } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState(blogPosts.find(post => post.id === Number(id)));

  useEffect(() => {
    // Find the post based on the ID from the URL
    const blogPost = blogPosts.find(post => post.id === Number(id));
    
    if (blogPost) {
      setPost(blogPost);
      document.title = `Z-ON DOOR | ${blogPost.title}`;
    } else {
      // Redirect to blog page if post not found
      navigate("/blog");
    }
    
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="pt-24 md:pt-28">
        <AnimateInView animation="fade-in">
          <div className="wesmarc-container section-padding">
            <Button
              variant="ghost"
              className="mb-6 flex items-center gap-2"
              onClick={() => navigate("/blog")}
            >
              <ArrowLeft size={16} />
              Back to All Posts
            </Button>

            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <span className="bg-primary/10 text-primary text-sm px-4 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-8 gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <User size={16} />
                  </div>
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays size={14} className="mr-1" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
              
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </AnimateInView>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
