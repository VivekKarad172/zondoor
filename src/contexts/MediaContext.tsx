
import React, { createContext, useContext, useState, useEffect } from "react";
import { MediaItem, MediaFolder, MediaLibraryContextType } from "@/components/media/types";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// Initial dummy data
const initialMediaItems: MediaItem[] = [
  {
    id: "1",
    url: "/lovable-uploads/c9565cf2-322b-42b1-99bd-bbad8bfa8263.png",
    name: "Door Design Classic",
    type: "image",
    size: 245000,
    createdAt: new Date().toISOString(),
    tags: ["door", "design", "product"],
    description: "Classic door design showcase"
  },
  {
    id: "2",
    url: "/lovable-uploads/75b2a0cb-8b53-4f2e-a82d-b10dded0e479.png",
    name: "Embossed Door",
    type: "image",
    size: 325000,
    createdAt: new Date().toISOString(),
    tags: ["door", "embossed", "product"],
    description: "3D embossed door design"
  },
  {
    id: "3",
    url: "/lovable-uploads/8416ee93-b407-4d4d-a95a-e088714269cf.png",
    name: "Z-ON Brand",
    type: "image",
    size: 185000,
    createdAt: new Date().toISOString(),
    tags: ["brand", "logo"],
    description: "Z-ON DOOR branding image"
  }
];

const initialFolders: MediaFolder[] = [
  {
    id: "products",
    name: "Products",
    items: [],
  },
  {
    id: "blog",
    name: "Blog Images",
    items: [],
  }
];

const MediaContext = createContext<MediaLibraryContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);
  const [folders, setFolders] = useState<MediaFolder[]>(initialFolders);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load media items from localStorage if available
  useEffect(() => {
    const savedMediaItems = localStorage.getItem("mediaItems");
    const savedFolders = localStorage.getItem("mediaFolders");
    
    if (savedMediaItems) {
      setMediaItems(JSON.parse(savedMediaItems));
    }
    
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  // Save to localStorage whenever media items or folders change
  useEffect(() => {
    localStorage.setItem("mediaItems", JSON.stringify(mediaItems));
    localStorage.setItem("mediaFolders", JSON.stringify(folders));
  }, [mediaItems, folders]);

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
      
      setMediaItems((prev) => [...prev, ...newItems]);
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
      setMediaItems((prev) => prev.filter((item) => !ids.includes(item.id)));
      
      // Remove from folders
      setFolders((prev) => 
        prev.map((folder) => ({
          ...folder,
          items: folder.items.filter((item) => !ids.includes(item.id))
        }))
      );
      
      // Clear selection if needed
      setSelectedItems((prev) => prev.filter((id) => !ids.includes(id)));
      
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
      const updatedItems = mediaItems.map((item) => 
        item.id === id ? { ...item, ...data } : item
      );
      
      setMediaItems(updatedItems);
      const updatedItem = updatedItems.find((item) => item.id === id)!;
      
      // Update in folders if present
      setFolders((prev) => 
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
    setSelectedItems((prev) => 
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const deselectItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
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
    
    setFolders((prev) => [...prev, newFolder]);
    toast.success(`Created folder "${name}"`);
    return newFolder;
  };

  const deleteFolder = async (id: string): Promise<void> => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
    if (selectedFolder === id) {
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

  const contextValue: MediaLibraryContextType = {
    mediaItems,
    folders,
    selectedFolder,
    selectedItems,
    isLoading,
    searchQuery,
    addMedia,
    deleteMedia,
    updateMedia,
    selectFolder,
    selectItem,
    deselectItem,
    clearSelection,
    setSearchQuery,
    createFolder,
    deleteFolder,
    addToFolder,
    removeFromFolder
  };

  return (
    <MediaContext.Provider value={contextValue}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = (): MediaLibraryContextType => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};
