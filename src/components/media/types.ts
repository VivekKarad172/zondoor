
export interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: "image" | "document" | "video";
  size: number;
  createdAt: string;
  tags?: string[];
  description?: string;
}

export interface MediaFolder {
  id: string;
  name: string;
  items: MediaItem[];
}

export interface MediaLibraryContextType {
  mediaItems: MediaItem[];
  folders: MediaFolder[];
  selectedFolder: string | null;
  selectedItems: string[];
  isLoading: boolean;
  searchQuery: string;
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
