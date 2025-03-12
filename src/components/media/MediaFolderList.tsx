import React from "react";
import { MediaFolder } from "./types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Folder, FolderOpen, Image, Trash2 } from "lucide-react";
import { useMedia } from "@/contexts/media";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MediaFolderListProps {
  folders: MediaFolder[];
  selectedFolder: string | null;
  onSelectFolder: (folderId: string | null) => void;
}

const MediaFolderList: React.FC<MediaFolderListProps> = ({
  folders,
  selectedFolder,
  onSelectFolder,
}) => {
  const { deleteFolder } = useMedia();
  const [folderToDelete, setFolderToDelete] = React.useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, folderId: string) => {
    e.stopPropagation();
    setFolderToDelete(folderId);
  };

  const handleDelete = async () => {
    if (folderToDelete) {
      await deleteFolder(folderToDelete);
      setFolderToDelete(null);
    }
  };

  return (
    <>
      <div className="p-2 space-y-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start font-normal",
            !selectedFolder && "bg-muted/50"
          )}
          onClick={() => onSelectFolder(null)}
        >
          <Image className="mr-2 h-4 w-4" />
          All Media
        </Button>
        
        {folders.map((folder) => (
          <div 
            key={folder.id}
            className="flex items-center group"
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start font-normal",
                selectedFolder === folder.id && "bg-muted/50"
              )}
              onClick={() => onSelectFolder(folder.id)}
            >
              {selectedFolder === folder.id ? (
                <FolderOpen className="mr-2 h-4 w-4" />
              ) : (
                <Folder className="mr-2 h-4 w-4" />
              )}
              {folder.name}
              {folder.items.length > 0 && (
                <span className="ml-1 text-xs text-muted-foreground">
                  ({folder.items.length})
                </span>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => handleDeleteClick(e, folder.id)}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        ))}
      </div>
      
      <AlertDialog 
        open={!!folderToDelete} 
        onOpenChange={(open) => !open && setFolderToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the folder. The media items themselves will not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MediaFolderList;
