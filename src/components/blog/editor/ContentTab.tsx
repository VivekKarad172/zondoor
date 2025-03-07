
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
        <label className="block text-sm font-medium mb-1">Excerpt (Brief Summary)</label>
        <Textarea
          name="excerpt"
          value={excerpt}
          onChange={onExcerptChange}
          placeholder="Write a brief excerpt for the blog post"
          rows={2}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <FormatToolbar onFormatClick={onFormatClick} />
        <Textarea
          value={content}
          onChange={onContentChange}
          className="font-mono text-sm"
          rows={15}
        />
      </div>
    </div>
  );
};

export default ContentTab;
