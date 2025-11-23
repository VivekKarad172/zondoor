import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/blog";
import BlogPostForm from "@/components/blog/admin/BlogPostForm";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/blog-management');
      return;
    }

    if (id && id !== 'new') {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id, user, navigate]);

  const fetchPost = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data as unknown as BlogPost);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load post",
        variant: "destructive"
      });
      navigate('/admin/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData: Partial<BlogPost>, publish: boolean) => {
    try {
      const postData: any = {
        title: formData.title,
        subtitle: formData.subtitle,
        slug: formData.slug,
        category: formData.category,
        main_image_url: formData.main_image_url,
        read_time: formData.read_time,
        seo_title: formData.seo_title,
        seo_description: formData.seo_description,
        content_blocks: formData.content_blocks,
        status: publish ? 'published' : 'draft',
        published_at: publish ? new Date().toISOString() : formData.published_at
      };

      let error;
      
      if (id && id !== 'new') {
        // Update existing post
        const result = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
        error = result.error;
      } else {
        // Create new post
        const result = await supabase
          .from('blog_posts')
          .insert([postData]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: publish ? "Post published successfully" : "Post saved as draft"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save post",
        variant: "destructive"
      });
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="wesmarc-container">
            <div className="text-center py-12">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="wesmarc-container max-w-5xl">
          <BlogPostForm post={post} onSave={handleSave} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogEditorPage;
