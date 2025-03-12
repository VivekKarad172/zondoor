
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderPlus } from "lucide-react";

interface FolderCreatorProps {
  onCreateFolder: (name: string) => Promise<void>;
}

const FolderCreator: React.FC<FolderCreatorProps> = ({ onCreateFolder }) => {
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      await onCreateFolder(newFolderName);
      setNewFolderName("");
      setIsCreatingFolder(false);
    }
  };

  return (
    <>
      {isCreatingFolder ? (
        <div className="flex items-center gap-2">
          <Input
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="w-40"
          />
          <Button onClick={handleCreateFolder} size="sm">
            Create
          </Button>
          <Button 
            onClick={() => setIsCreatingFolder(false)} 
            variant="ghost" 
            size="sm"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline"
          onClick={() => setIsCreatingFolder(true)}
          className="gap-1"
        >
          <FolderPlus className="h-4 w-4" />
          New Folder
        </Button>
      )}
    </>
  );
};

export default FolderCreator;
