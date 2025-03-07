
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SeoTabProps {
  title: string;
  excerpt: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SeoTab = ({ title, excerpt, onChange }: SeoTabProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Meta Title (SEO)</label>
        <Input
          name="metaTitle"
          value={title}
          onChange={onChange}
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
          value={excerpt}
          onChange={onChange}
          placeholder="Enter meta description for SEO"
          rows={3}
        />
        <p className="text-xs text-gray-500 mt-1">
          This description appears in search engine results. Aim for 150-160 characters.
        </p>
      </div>
    </div>
  );
};

export default SeoTab;
