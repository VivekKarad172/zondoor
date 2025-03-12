
import { MediaItem, MediaFolder } from "@/components/media/types";

export interface MediaContextState {
  mediaItems: MediaItem[];
  folders: MediaFolder[];
  selectedFolder: string | null;
  selectedItems: string[];
  isLoading: boolean;
  searchQuery: string;
}

export interface MediaContextActions {
  addMedia: (files: File[]) => Promise<MediaItem[]>;
  deleteMedia: (ids: string[]) => Promise<void>;
  updateMedia: (id: string, data: Partial<MediaItem>) => Promise<MediaItem>;
  selectFolder: (folderId: string | null) => void;
  selectItem: (id: string) => void;
  deselectItem: (id: string) => void;
  clearSelection: () => void;
  setSearchQuery: (query: string) => void;
  createFolder: (name: string) => Promise<MediaFolder>;
  deleteFolder: (id: string) => Promise<void>;
  addToFolder: (itemIds: string[], folderId: string) => Promise<void>;
  removeFromFolder: (itemIds: string[], folderId: string) => Promise<void>;
}

export type MediaContextType = MediaContextState & MediaContextActions;
