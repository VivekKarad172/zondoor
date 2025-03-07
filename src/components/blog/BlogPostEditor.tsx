import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogPost } from "./BlogData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  Image,
  Heading2,
  Save,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BlogPostEditorProps {
  post: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  isNew?: boolean;
}

const BlogPostEditor = ({ post, onSave, onCancel, isNew = false }: BlogPostEditorProps) => {
  const [editedPost, setEditedPost] = useState<BlogPost>({ ...post });
  const [previewImage, setPreviewImage] = useState<string>(post.image);

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

  const formatButtons = [
    { icon: <Bold size={16} />, format: "bold", tooltip: "Bold" },
    { icon: <Italic size={16} />, format: "italic", tooltip: "Italic" },
    { icon: <Heading2 size={16} />, format: "h2", tooltip: "Heading" },
    { icon: <List size={16} />, format: "ul", tooltip: "Bullet List" },
    { icon: <ListOrdered size={16} />, format: "ol", tooltip: "Numbered List" },
    { icon: <Link size={16} />, format: "link", tooltip: "Insert Link" },
    { icon: <Image size={16} />, format: "image", tooltip: "Insert Image" },
  ];

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = e.target.value;
    setEditedPost({ ...editedPost, image: imageUrl });
    setPreviewImage(imageUrl);
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
          
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              name="title"
              value={editedPost.title}
              onChange={handleChange}
              placeholder="Enter post title"
              className="mb-4"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select
                value={editedPost.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Author</label>
              <Input
                name="author"
                value={editedPost.author}
                onChange={handleChange}
                placeholder="Enter author name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Featured Image URL</label>
            <Input
              name="image"
              value={editedPost.image}
              onChange={handleImageUrlChange}
              placeholder="Enter image URL"
              className="mb-2"
            />
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="rounded-lg overflow-hidden border border-gray-200 h-48 flex items-center justify-center">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-center p-4">
                Image preview will appear here
              </div>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Excerpt (Brief Summary)</label>
            <Textarea
              name="excerpt"
              value={editedPost.excerpt}
              onChange={handleChange}
              placeholder="Write a brief excerpt for the blog post"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <div className="bg-gray-100 p-2 rounded flex gap-1 mb-2 overflow-x-auto">
              <TooltipProvider>
                {formatButtons.map((btn) => (
                  <Tooltip key={btn.format}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFormatClick(btn.format)}
                        className="h-8 px-2"
                      >
                        {btn.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{btn.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <Textarea
              value={editedPost.content}
              onChange={handleContentChange}
              className="font-mono text-sm"
              rows={15}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Meta Title (SEO)</label>
            <Input
              name="metaTitle"
              value={editedPost.title}
              onChange={handleChange}
              placeholder="Enter SEO title (defaults to post title)"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will appear in search engine results and browser tabs.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Meta Description (SEO)</label>
            <Textarea
              name="excerpt"
              value={editedPost.excerpt}
              onChange={handleChange}
              placeholder="Enter meta description for SEO"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              This description appears in search engine results. Aim for 150-160 characters.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
          <X size={16} />
          Cancel
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save size={16} />
          {isNew ? "Publish Post" : "Update Post"}
        </Button>
      </div>
    </div>
  );
};

export default BlogPostEditor;
