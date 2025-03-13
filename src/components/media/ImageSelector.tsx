
import React from "react";
import { cn } from "@/lib/utils";

interface ImageSelectorProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  aspectRatio?: number;
  placeholder?: string;
  maxHeight?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  readOnly?: boolean;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  value,
  onChange,
  className,
  aspectRatio = 16 / 9,
  placeholder = "Select an image",
  maxHeight,
  objectFit = "contain",
  readOnly = false
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div 
        className={cn(
          "relative border rounded-md overflow-hidden bg-muted/40 flex items-center justify-center",
          maxHeight ? "" : "aspect-[1]"
        )}
        style={maxHeight ? { maxHeight } : aspectRatio ? { aspectRatio } : undefined}
      >
        {value ? (
          <img
            src={value}
            alt="Selected image"
            style={{ objectFit }}
            className="w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        ) : (
          <div className="text-center p-4">
            <div className="h-10 w-10 mx-auto text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{placeholder}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSelector;
