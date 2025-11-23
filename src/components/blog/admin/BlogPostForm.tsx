import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPost, BLOG_CATEGORIES } from "@/types/blog";
import BlockEditor from "./BlockEditor";
import ImageSelector from "@/components/media/ImageSelector";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPostFormProps {
  post?: BlogPost;
  onSave: (post: Partial<BlogPost>, publish: boolean) => Promise<void>;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, onSave }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    subtitle: '',
    slug: '',
    category: 'Guide',
    main_image_url: '',
    read_time: 5,
    seo_title: '',
    seo_description: '',
    content_blocks: [],
    ...post
  });
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !post) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, post]);

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    try {
      await onSave(formData, publish);
      navigate('/admin/blog');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/blog')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Button>
          <h2 className="text-2xl font-bold">
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={saving}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={saving}
          >
            {post?.status === 'published' ? 'Update Post' : 'Publish'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 mt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Short line under the title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Main Image</label>
              <ImageSelector
                value={formData.main_image_url || ''}
                onChange={(url) => setFormData({ ...formData, main_image_url: url })}
                aspectRatio={16/9}
                placeholder="Upload or select main image"
              />
              <Input
                className="mt-2"
                value={formData.main_image_url || ''}
                onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
                placeholder="Or paste image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content Blocks</label>
              <BlockEditor
                blocks={formData.content_blocks || []}
                onChange={(blocks) => setFormData({ ...formData, content_blocks: blocks })}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="url-friendly-slug"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This will be the URL: /blog/{formData.slug || 'your-slug'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <Select
              value={formData.category}
              onValueChange={(val) => setFormData({ ...formData, category: val })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BLOG_CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Read Time (minutes)</label>
            <Input
              type="number"
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
              min="1"
            />
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium mb-2">SEO Title</label>
            <Input
              value={formData.seo_title || ''}
              onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
              placeholder="Leave empty to use post title"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {(formData.seo_title || '').length}/60 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">SEO Description</label>
            <Input
              value={formData.seo_description || ''}
              onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
              placeholder="Brief description for search engines"
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {(formData.seo_description || '').length}/160 characters
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogPostForm;
