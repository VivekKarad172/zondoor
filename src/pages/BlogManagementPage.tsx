
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimateInView } from "@/components/ui/motion";
import BlogAuth from "@/components/blog/admin/BlogAuth";
import BlogManagementContent from "@/components/blog/admin/BlogManagementContent";
import { useBlogPosts } from "@/hooks/use-blog-posts";

const BlogManagementPage = () => {
  const { posts, setPosts } = useBlogPosts();

  // Update document title on mount
  useEffect(() => {
    document.title = "Z-ON DOOR | Blog Management";
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="pt-24 md:pt-28">
        <AnimateInView animation="fade-in">
          <div className="wesmarc-container section-padding">
            <BlogAuth>
              <BlogManagementContent posts={posts} setPosts={setPosts} />
            </BlogAuth>
          </div>
        </AnimateInView>
      </div>
      <Footer />
    </div>
  );
};

export default BlogManagementPage;
