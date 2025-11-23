
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/blog";

const BlogPosts = () => {
  const [category, setCategory] = useState<string>("all");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts((data as unknown as BlogPost[]) || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredPosts = category === "all" 
    ? posts 
    : posts.filter(post => post.category === category);
  
  const categories = ["all", ...new Set(posts.map(post => post.category))];

  if (loading) {
    return <div className="text-center py-12">Loading posts...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No posts found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPosts;
