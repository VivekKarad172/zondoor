
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { MediaItem } from "@/components/media/types";
import { MediaContextInternalState } from "../types";

export const createMediaItemActions = (state: MediaContextInternalState) => {
  const { setMediaItems, setFolders, setSelectedItems, setIsLoading } = state;

  const addMedia = async (files: File[]): Promise<MediaItem[]> => {
    setIsLoading(true);
    
    try {
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
      setMediaItems((prev) => prev.filter((item) => !ids.includes(item.id)));
      setFolders((prev) => 
        prev.map((folder) => ({
          ...folder,
          items: folder.items.filter((item) => !ids.includes(item.id))
        }))
      );
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
      let updatedItem: MediaItem;
      
      setMediaItems((prev) => {
        const updated = prev.map((item) => 
          item.id === id ? { ...item, ...data } : item
        );
        updatedItem = updated.find((item) => item.id === id)!;
        return updated;
      });

      setFolders((prev) => 
        prev.map((folder) => ({
          ...folder,
          items: folder.items.map((item) => 
            item.id === id ? { ...item, ...data } : item
          )
        }))
      );
      
      toast.success(`Updated "${data.name || updatedItem!.name}"`);
      return updatedItem!;
    } catch (error) {
      toast.error("Failed to update media");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { addMedia, deleteMedia, updateMedia };
};
