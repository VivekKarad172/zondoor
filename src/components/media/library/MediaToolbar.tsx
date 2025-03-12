
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import MediaSearchBar from "./MediaSearchBar";
import FolderCreator from "./FolderCreator";

interface MediaToolbarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  onCreateFolder: (name: string) => Promise<void>;
  selectedItems: string[];
  onDeleteSelected: () => Promise<void>;
  onClearSelection: () => void;
}

const MediaToolbar: React.FC<MediaToolbarProps> = ({
  searchQuery,
  onSearchChange,
  onUploadClick,
  onCreateFolder,
  selectedItems,
  onDeleteSelected,
  onClearSelection,
}) => {
  return (
    <div className="px-6 py-3 bg-muted/20 border-b flex flex-wrap gap-2 items-center justify-between">
      <div className="flex items-center gap-2 flex-grow">
        <MediaSearchBar 
          searchQuery={searchQuery} 
          onSearchChange={onSearchChange} 
        />
        
        <Button 
          variant="outline" 
          onClick={onUploadClick}
          className="gap-1"
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
        
        <FolderCreator onCreateFolder={onCreateFolder} />
      </div>
      
      {selectedItems.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedItems.length} selected
          </span>
          <Button 
            variant="destructive"
            size="sm"
            onClick={onDeleteSelected}
            className="gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default MediaToolbar;
