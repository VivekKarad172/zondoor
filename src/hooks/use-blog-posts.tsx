import { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";
import { supabase } from "@/integrations/supabase/client";

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts((data as unknown as BlogPost[]) || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  return { posts, setPosts };
};
