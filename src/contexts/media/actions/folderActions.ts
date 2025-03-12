
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { MediaFolder } from "@/components/media/types";
import { MediaContextInternalState } from "../types";

export const createFolderActions = (state: MediaContextInternalState) => {
  const { mediaItems, folders, setFolders, setSelectedFolder } = state;

  const createFolder = async (name: string): Promise<MediaFolder> => {
    const newFolder: MediaFolder = {
      id: uuidv4(),
      name,
      items: []
    };
    
    setFolders((prev) => [...prev, newFolder]);
    toast.success(`Created folder "${name}"`);
    return newFolder;
  };

  const deleteFolder = async (id: string): Promise<void> => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
    if (state.selectedFolder === id) {
      setSelectedFolder(null);
    }
    toast.success("Folder deleted");
  };

  const addToFolder = async (itemIds: string[], folderId: string): Promise<void> => {
    const folder = folders.find((f) => f.id === folderId);
    if (!folder) return;
    
    const itemsToAdd = mediaItems.filter((item) => itemIds.includes(item.id));
    
    setFolders((prev) => 
      prev.map((f) => 
        f.id === folderId ? {
          ...f,
          items: [...f.items, ...itemsToAdd.filter((item) => 
            !f.items.some((existingItem) => existingItem.id === item.id)
          )]
        } : f
      )
    );
    
    toast.success(`Added ${itemIds.length} item(s) to folder "${folder.name}"`);
  };

  const removeFromFolder = async (itemIds: string[], folderId: string): Promise<void> => {
    setFolders((prev) => 
      prev.map((f) => 
        f.id === folderId ? {
          ...f,
          items: f.items.filter((item) => !itemIds.includes(item.id))
        } : f
      )
    );
    
    const folderName = folders.find((f) => f.id === folderId)?.name;
    toast.success(`Removed ${itemIds.length} item(s) from folder "${folderName}"`);
  };

  return { createFolder, deleteFolder, addToFolder, removeFromFolder };
};
