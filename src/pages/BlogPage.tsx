
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPosts from "@/components/blog/BlogPosts";
import { AnimateInView } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Helmet } from "react-helmet";

const BlogPage = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    // Update document title with SEO keywords
    document.title = "PVC Door Blog | Bathroom, Bedroom & Interior Door Guides | Z-on Door";
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <Helmet>
        <title>PVC Door Blog | Bathroom, Bedroom & Interior Door Guides | Z-on Door</title>
        <meta name="description" content="Expert guides on PVC doors for bathroom, bedroom & interior spaces. Learn about waterproof, termite-proof, long-lasting doors for washroom and home interiors." />
        <meta name="keywords" content="pvc door blog, bathroom door guide, bedroom door tips, interior door advice, waterproof door maintenance, pvc door installation" />
        <link rel="canonical" href="https://zondoor.com/blog" />
      </Helmet>
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
                  {user ? "Manage Blog" : "Login to Manage"}
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
