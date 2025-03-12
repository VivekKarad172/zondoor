
import { useState, useEffect } from "react";
import { MediaContextState } from "./types";
import { initialMediaItems, initialFolders } from "./initialData";

export const useMediaState = (): MediaContextState => {
  const [mediaItems, setMediaItems] = useState(initialMediaItems);
  const [folders, setFolders] = useState(initialFolders);
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

  return {
    mediaItems,
    folders,
    selectedFolder,
    selectedItems,
    isLoading,
    searchQuery,
    setMediaItems,
    setFolders,
    setSelectedFolder,
    setSelectedItems,
    setIsLoading,
    setSearchQuery
  };
};
