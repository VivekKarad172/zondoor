
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import FormatToolbar from "./FormatToolbar";

interface ContentTabProps {
  excerpt: string;
  content: string;
  onExcerptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFormatClick: (format: string) => void;
}

const ContentTab = ({
  excerpt,
  content,
  onExcerptChange,
  onContentChange,
  onFormatClick,
}: ContentTabProps) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Short Summary</label>
        <p className="text-xs text-muted-foreground mb-2">
          A short description that appears in the blog list (1-2 sentences)
        </p>
        <Textarea
          name="excerpt"
          value={excerpt}
          onChange={onExcerptChange}
          placeholder="Write a short summary of your blog post..."
          rows={2}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Blog Content</label>
        <p className="text-xs text-muted-foreground mb-2">
          Write your blog post here. You can use the formatting buttons to style your text.
        </p>
        <FormatToolbar onFormatClick={onFormatClick} />
        <Textarea
          value={content}
          onChange={onContentChange}
          className="font-sans text-sm"
          rows={15}
          placeholder="Start writing your blog content here..."
        />
      </div>
    </div>
  );
};

export default ContentTab;
