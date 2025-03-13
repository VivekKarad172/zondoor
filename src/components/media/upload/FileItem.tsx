
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Image, File } from "lucide-react";

interface FileItemProps {
  file: File;
  onRemove: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => {
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  const getThumbnail = (file: File) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <li className="px-4 py-2 flex items-center gap-3">
      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden shrink-0">
        {getThumbnail(file) ? (
          <img 
            src={getThumbnail(file)!} 
            alt={file.name}
            className="h-full w-full object-cover"
          />
        ) : (
          getFileIcon(file)
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {file.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {(file.size / 1024).toFixed(0)} KB
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </li>
  );
};

export default FileItem;
