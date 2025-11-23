import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentBlock } from "@/types/blog";
import { Trash2, MoveUp, MoveDown, Image as ImageIcon } from "lucide-react";
import ImageSelector from "@/components/media/ImageSelector";

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ blocks, onChange }) => {
  const addBlock = (type: ContentBlock['type']) => {
    let newBlock: ContentBlock;
    
    if (type === 'heading') {
      newBlock = { type: 'heading', level: 2, text: '' };
    } else if (type === 'paragraph') {
      newBlock = { type: 'paragraph', text: '' };
    } else {
      newBlock = { type: 'image', url: '', caption: '', align: 'center' };
    }
    
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (index: number, updatedBlock: ContentBlock) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    onChange(newBlocks);
  };

  const deleteBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    onChange(newBlocks);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => addBlock('heading')}
        >
          + Add Heading
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => addBlock('paragraph')}
        >
          + Add Paragraph
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => addBlock('image')}
        >
          <ImageIcon className="h-4 w-4 mr-1" />
          + Add Image
        </Button>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={index} className="border rounded-lg p-4 bg-muted/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-muted-foreground">
                {block.type === 'heading' ? `Heading H${block.level}` : 
                 block.type === 'paragraph' ? 'Paragraph' : 'Image'}
              </span>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === blocks.length - 1}
                >
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteBlock(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {block.type === 'heading' && (
              <div className="space-y-2">
                <Select
                  value={String(block.level)}
                  onValueChange={(val) => updateBlock(index, { ...block, level: Number(val) as 2 | 3 })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">H2</SelectItem>
                    <SelectItem value="3">H3</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Heading text"
                  value={block.text}
                  onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                />
              </div>
            )}

            {block.type === 'paragraph' && (
              <Textarea
                placeholder="Paragraph text"
                value={block.text}
                onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                rows={4}
              />
            )}

            {block.type === 'image' && (
              <div className="space-y-3">
                <ImageSelector
                  value={block.url}
                  onChange={(url) => updateBlock(index, { ...block, url })}
                  aspectRatio={16/9}
                  placeholder="Select an image for this block"
                />
                <Input
                  placeholder="Image URL"
                  value={block.url}
                  onChange={(e) => updateBlock(index, { ...block, url: e.target.value })}
                />
                <Input
                  placeholder="Caption (optional)"
                  value={block.caption || ''}
                  onChange={(e) => updateBlock(index, { ...block, caption: e.target.value })}
                />
                <Select
                  value={block.align}
                  onValueChange={(val) => updateBlock(index, { ...block, align: val as 'left' | 'center' | 'right' })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        ))}

        {blocks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No content blocks yet. Add a heading, paragraph, or image to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockEditor;
