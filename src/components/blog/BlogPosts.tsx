
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { blogPosts } from "./BlogData";

const BlogPosts = () => {
  const [category, setCategory] = useState<string>("all");
  
  const filteredPosts = category === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === category);
  
  const categories = ["all", ...new Set(blogPosts.map(post => post.category))];

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
