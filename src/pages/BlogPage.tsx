
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPosts from "@/components/blog/BlogPosts";
import { AnimateInView } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  useEffect(() => {
    // Update document title
    document.title = "Z-ON DOOR | Blog";
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="pt-24 md:pt-28">
        <AnimateInView animation="fade-in">
          <div className="wesmarc-container section-padding">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Blog</h1>
              <Button variant="outline" asChild>
                <Link to="/blog-management" className="flex items-center gap-2">
                  <Settings size={16} />
                  Manage Blog
                </Link>
              </Button>
            </div>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Stay updated with the latest trends, door designs, and industry insights
            </p>
            <BlogPosts />
          </div>
        </AnimateInView>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
