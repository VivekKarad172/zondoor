export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  main_image_url?: string;
  read_time: number;
  status: 'draft' | 'published';
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  content_blocks: ContentBlock[];
  created_at: string;
  updated_at: string;
}

export type ContentBlock = 
  | HeadingBlock 
  | ParagraphBlock 
  | ImageBlock;

export interface HeadingBlock {
  type: 'heading';
  level: 2 | 3;
  text: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface ImageBlock {
  type: 'image';
  url: string;
  caption?: string;
  align: 'left' | 'center' | 'right';
}

export const BLOG_CATEGORIES = ['Guide', 'Product', 'Maintenance', 'Other'] as const;
