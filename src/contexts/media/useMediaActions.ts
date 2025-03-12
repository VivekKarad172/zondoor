
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { MediaItem, MediaFolder } from "@/components/media/types";
import { MediaContextActions } from "./types";

export const useMediaActions = (state: any): MediaContextActions => {
  const {
    mediaItems,
    folders,
    setMediaItems,
    setFolders,
    setSelectedFolder,
    setSelectedItems,
    setIsLoading
  } = state;

  const addMedia = async (files: File[]): Promise<MediaItem[]> => {
    setIsLoading(true);
    
    try {
      // In a real app, you'd upload to a server here
      // For this demo, we'll create local URLs
      const newItems: MediaItem[] = await Promise.all(
        files.map(async (file) => {
          return new Promise<MediaItem>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                const newItem: MediaItem = {
                  id: uuidv4(),
                  url: e.target.result as string,
                  name: file.name,
                  type: file.type.startsWith("image/") ? "image" : 
                        file.type.startsWith("video/") ? "video" : "document",
                  size: file.size,
                  createdAt: new Date().toISOString(),
                  tags: []
                };
                resolve(newItem);
              }
            };
            reader.readAsDataURL(file);
          });
        })
      );
      
      setMediaItems((prev: MediaItem[]) => [...prev, ...newItems]);
      toast.success(`Successfully added ${newItems.length} file(s)`);
      return newItems;
    } catch (error) {
      toast.error("Failed to upload media");
      console.error(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMedia = async (ids: string[]): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Remove from main list
      setMediaItems((prev: MediaItem[]) => prev.filter((item) => !ids.includes(item.id)));
      
      // Remove from folders
      setFolders((prev: MediaFolder[]) => 
        prev.map((folder) => ({
          ...folder,
          items: folder.items.filter((item) => !ids.includes(item.id))
        }))
      );
      
      // Clear selection if needed
      setSelectedItems((prev: string[]) => prev.filter((id) => !ids.includes(id)));
      
      toast.success(`Deleted ${ids.length} item(s)`);
    } catch (error) {
      toast.error("Failed to delete media");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMedia = async (id: string, data: Partial<MediaItem>): Promise<MediaItem> => {
    setIsLoading(true);
    
    try {
      const updatedItems = mediaItems.map((item: MediaItem) => 
        item.id === id ? { ...item, ...data } : item
      );
      
      setMediaItems(updatedItems);
      const updatedItem = updatedItems.find((item: MediaItem) => item.id === id)!;
      
      // Update in folders if present
      setFolders((prev: MediaFolder[]) => 
        prev.map((folder) => ({
          ...folder,
          items: folder.items.map((item) => 
            item.id === id ? { ...item, ...data } : item
          )
        }))
      );
      
      toast.success(`Updated "${data.name || updatedItem.name}"`);
      return updatedItem;
    } catch (error) {
      toast.error("Failed to update media");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const selectFolder = (folderId: string | null) => {
    setSelectedFolder(folderId);
    setSelectedItems([]);
  };

  const selectItem = (id: string) => {
    setSelectedItems((prev: string[]) => 
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const deselectItem = (id: string) => {
    setSelectedItems((prev: string[]) => prev.filter((itemId) => itemId !== id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const createFolder = async (name: string): Promise<MediaFolder> => {
    const newFolder: MediaFolder = {
      id: uuidv4(),
      name,
      items: []
    };
    
    setFolders((prev: MediaFolder[]) => [...prev, newFolder]);
    toast.success(`Created folder "${name}"`);
    return newFolder;
  };

  const deleteFolder = async (id: string): Promise<void> => {
    setFolders((prev: MediaFolder[]) => prev.filter((folder) => folder.id !== id));
    if (state.selectedFolder === id) {
      setSelectedFolder(null);
    }
    toast.success("Folder deleted");
  };

  const addToFolder = async (itemIds: string[], folderId: string): Promise<void> => {
    const folder = folders.find((f: MediaFolder) => f.id === folderId);
    if (!folder) return;
    
    const itemsToAdd = mediaItems.filter((item: MediaItem) => itemIds.includes(item.id));
    
    setFolders((prev: MediaFolder[]) => 
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
    setFolders((prev: MediaFolder[]) => 
      prev.map((f) => 
        f.id === folderId ? {
          ...f,
          items: f.items.filter((item) => !itemIds.includes(item.id))
        } : f
      )
    );
    
    const folderName = folders.find((f: MediaFolder) => f.id === folderId)?.name;
    toast.success(`Removed ${itemIds.length} item(s) from folder "${folderName}"`);
  };

  return {
    addMedia,
    deleteMedia,
    updateMedia,
    selectFolder,
    selectItem,
    deselectItem,
    clearSelection,
    setSearchQuery: state.setSearchQuery,
    createFolder,
    deleteFolder,
    addToFolder,
    removeFromFolder
  };
};
