
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
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostMetadata = ({
  title,
  category,
  author,
  image,
  onInputChange,
  onCategoryChange,
  onImageChange,
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
        <label className="block text-sm font-medium mb-1">Featured Image URL</label>
        <Input
          name="image"
          value={image}
          onChange={onImageChange}
          placeholder="Enter image URL"
          className="mb-2"
        />
      </div>
    </div>
  );
};

export default PostMetadata;
