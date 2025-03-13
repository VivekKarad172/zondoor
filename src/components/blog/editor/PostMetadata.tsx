
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostMetadataProps {
  title: string;
  category: "product" | "design" | "maintenance" | "guide";
  author: string;
  image: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (value: "product" | "design" | "maintenance" | "guide") => void;
  onImageChange: (url: string) => void;
  readOnly?: boolean;
}

const PostMetadata = ({
  title,
  category,
  author,
  image,
  onInputChange,
  onCategoryChange,
  onImageChange,
  readOnly = true
}: PostMetadataProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          name="title"
          value={title}
          onChange={onInputChange}
          placeholder="Enter post title"
          className="mb-4"
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Category</label>
          <Select
            value={category}
            onValueChange={onCategoryChange}
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
            value={author}
            onChange={onInputChange}
            placeholder="Enter author name"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Featured Image</label>
        <div className="w-full aspect-[16/9] rounded-md overflow-hidden bg-muted/40">
          {image ? (
            <img
              src={image}
              alt="Featured image"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-4">
                <div className="h-10 w-10 mx-auto text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Featured image for your post</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostMetadata;
