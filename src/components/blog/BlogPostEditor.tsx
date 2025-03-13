
import React, { useState } from "react";
import { BlogPost } from "./BlogData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostMetadata from "./editor/PostMetadata";
import ImagePreview from "./editor/ImagePreview";
import ContentTab from "./editor/ContentTab";
import SeoTab from "./editor/SeoTab";
import EditorActions from "./editor/EditorActions";

interface BlogPostEditorProps {
  post: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  isNew?: boolean;
}

const BlogPostEditor = ({ post, onSave, onCancel, isNew = false }: BlogPostEditorProps) => {
  const [editedPost, setEditedPost] = useState<BlogPost>({ ...post });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleCategoryChange = (value: "product" | "design" | "maintenance" | "guide") => {
    setEditedPost({ ...editedPost, category: value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedPost({ ...editedPost, content: e.target.value });
  };

  const handleFormatClick = (format: string) => {
    let newContent = editedPost.content;
    const selection = window.getSelection();
    let selectedText = "";
    
    if (selection && selection.toString()) {
      selectedText = selection.toString();
      
      switch (format) {
        case "bold":
          newContent = newContent.replace(
            selectedText,
            `<strong>${selectedText}</strong>`
          );
          break;
        case "italic":
          newContent = newContent.replace(
            selectedText,
            `<em>${selectedText}</em>`
          );
          break;
        case "h2":
          newContent = newContent.replace(
            selectedText,
            `<h3>${selectedText}</h3>`
          );
          break;
        case "ul":
          newContent = newContent.replace(
            selectedText,
            `<ul>\n  <li>${selectedText}</li>\n</ul>`
          );
          break;
        case "ol":
          newContent = newContent.replace(
            selectedText,
            `<ol>\n  <li>${selectedText}</li>\n</ol>`
          );
          break;
        case "link":
          const url = prompt("Enter URL:", "https://");
          if (url) {
            newContent = newContent.replace(
              selectedText,
              `<a href="${url}">${selectedText}</a>`
            );
          }
          break;
        case "image":
          const imageUrl = prompt("Enter image URL:", "https://");
          if (imageUrl) {
            newContent = newContent.replace(
              selectedText,
              `<img src="${imageUrl}" alt="${selectedText}" />`
            );
          }
          break;
      }
      
      setEditedPost({ ...editedPost, content: newContent });
    }
  };

  const handleImageChange = (imageUrl: string) => {
    setEditedPost({ ...editedPost, image: imageUrl });
  };

  const calculateReadTime = () => {
    const text = editedPost.content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    setEditedPost({ ...editedPost, readTime: readingTime });
  };

  const handleSave = () => {
    calculateReadTime();
    if (isNew) {
      editedPost.date = new Date().toISOString().split("T")[0];
    }
    onSave(editedPost);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-xl font-semibold mb-2">
            {isNew ? "Create New Post" : "Edit Post"}
          </h2>
          
          <PostMetadata
            title={editedPost.title}
            category={editedPost.category}
            author={editedPost.author}
            image={editedPost.image}
            onInputChange={handleChange}
            onCategoryChange={handleCategoryChange}
            onImageChange={handleImageChange}
            readOnly={false} // Blog editor should still be able to change images
          />
        </div>
        
        <div className="md:w-1/3">
          <ImagePreview 
            imageUrl={editedPost.image} 
            onImageChange={handleImageChange}
            readOnly={false} // Blog editor should still be able to change images
          />
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <ContentTab
            excerpt={editedPost.excerpt}
            content={editedPost.content}
            onExcerptChange={handleChange}
            onContentChange={handleContentChange}
            onFormatClick={handleFormatClick}
          />
        </TabsContent>
        
        <TabsContent value="seo">
          <SeoTab
            title={editedPost.title}
            excerpt={editedPost.excerpt}
            onChange={handleChange}
          />
        </TabsContent>
      </Tabs>

      <EditorActions
        onSave={handleSave}
        onCancel={onCancel}
        isNew={isNew}
      />
    </div>
  );
};

export default BlogPostEditor;
