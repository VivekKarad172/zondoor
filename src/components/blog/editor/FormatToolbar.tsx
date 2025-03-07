
import React from "react";
import { Bold, Italic, List, ListOrdered, Link, Image, Heading2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FormatToolbarProps {
  onFormatClick: (format: string) => void;
}

const FormatToolbar = ({ onFormatClick }: FormatToolbarProps) => {
  const formatButtons = [
    { icon: <Bold size={16} />, format: "bold", tooltip: "Bold" },
    { icon: <Italic size={16} />, format: "italic", tooltip: "Italic" },
    { icon: <Heading2 size={16} />, format: "h2", tooltip: "Heading" },
    { icon: <List size={16} />, format: "ul", tooltip: "Bullet List" },
    { icon: <ListOrdered size={16} />, format: "ol", tooltip: "Numbered List" },
    { icon: <Link size={16} />, format: "link", tooltip: "Insert Link" },
    { icon: <Image size={16} />, format: "image", tooltip: "Insert Image" },
  ];

  return (
    <div className="bg-gray-100 p-2 rounded flex gap-1 mb-2 overflow-x-auto">
      <TooltipProvider>
        {formatButtons.map((btn) => (
          <Tooltip key={btn.format}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFormatClick(btn.format)}
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
  );
};

export default FormatToolbar;
