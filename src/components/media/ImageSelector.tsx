
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon, Upload, X } from "lucide-react";
import MediaLibrary from "./MediaLibrary";

interface ImageSelectorProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  aspectRatio?: number;
  placeholder?: string;
  maxHeight?: number;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  value,
  onChange,
  className,
  aspectRatio = 16 / 9,
  placeholder = "Select an image",
  maxHeight,
}) => {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const handleOpenLibrary = () => {
    setIsLibraryOpen(true);
  };

  const handleCloseLibrary = () => {
    setIsLibraryOpen(false);
  };

  const handleSelectImage = (url: string) => {
    onChange(url);
    setIsLibraryOpen(false);
  };

  const handleClearImage = () => {
    onChange("");
  };

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
          <>
            <img
              src={value}
              alt="Selected image"
              className="w-full h-auto object-contain" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
              onClick={handleClearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="text-center p-4">
            <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">{placeholder}</p>
          </div>
        )}
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleOpenLibrary}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        {value ? "Change Image" : "Select Image"}
      </Button>
      
      <MediaLibrary
        isOpen={isLibraryOpen}
        onClose={handleCloseLibrary}
        onSelect={handleSelectImage}
        title="Select Image"
      />
    </div>
  );
};

export default ImageSelector;
