
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  isDragging: boolean;
  handleDragEnter: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  isDragging,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleFileInputChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center",
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-2 text-sm font-medium">
        Drag and drop files here
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Or click to browse for files
      </p>
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => fileInputRef.current?.click()}
      >
        Select Files
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        multiple
        accept="image/*,video/*,application/pdf"
        className="hidden"
      />
    </div>
  );
};

export default UploadArea;
