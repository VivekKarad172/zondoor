import React from "react";
import { ContentBlock } from "@/types/blog";

interface BlogPostContentProps {
  blocks: ContentBlock[];
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ blocks }) => {
  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag key={index} className="font-bold mt-8 mb-4">
              {block.text}
            </HeadingTag>
          );
        }

        if (block.type === 'paragraph') {
          // Split by double line breaks to create paragraphs
          const paragraphs = block.text.split(/\n\n+/);
          return (
            <div key={index}>
              {paragraphs.map((para, pIndex) => (
                <p key={pIndex} className="mb-4 text-foreground leading-relaxed whitespace-pre-line">
                  {para.trim()}
                </p>
              ))}
            </div>
          );
        }

        if (block.type === 'image') {
          return (
            <figure
              key={index}
              className={`my-8 ${
                block.align === 'center' ? 'text-center' :
                block.align === 'right' ? 'text-right' :
                'text-left'
              }`}
            >
              <img
                src={block.url}
                alt={block.caption || ''}
                className="rounded-lg max-w-full h-auto inline-block"
              />
              {block.caption && (
                <figcaption className="text-sm text-muted-foreground mt-2">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
};

export default BlogPostContent;
