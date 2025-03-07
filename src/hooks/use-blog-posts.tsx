
import { useState, useEffect } from "react";
import { blogPosts, BlogPost } from "@/components/blog/BlogData";

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Load posts on mount
  useEffect(() => {
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

  return { posts, setPosts };
};
