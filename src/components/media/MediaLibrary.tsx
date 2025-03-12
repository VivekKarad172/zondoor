import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MediaUploader from "./MediaUploader";
import { useMedia } from "@/contexts/media";
import MediaToolbar from "./library/MediaToolbar";
import MediaContent from "./library/MediaContent";
import MediaActions from "./library/MediaActions";

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
  allowMultiple?: boolean;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = "Media Library",
  allowMultiple = false,
}) => {
  const {
    mediaItems,
    folders,
    selectedFolder,
    selectedItems,
    searchQuery,
    setSearchQuery,
    selectFolder,
    clearSelection,
    createFolder,
    deleteMedia,
  } = useMedia();
  
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateFolder = async (name: string) => {
    await createFolder(name);
  };

  const handleSelectMedia = (id: string) => {
    const item = mediaItems.find(item => item.id === id);
    if (item) {
      onSelect(item.url);
      onClose();
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length > 0) {
      await deleteMedia(selectedItems);
    }
  };

  // Filter items based on search and selected folder
  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    if (selectedFolder) {
      const folder = folders.find(f => f.id === selectedFolder);
      return matchesSearch && folder?.items.some(folderItem => folderItem.id === item.id);
    }
    
    return matchesSearch;
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl h-[80vh] max-h-[800px] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <MediaToolbar 
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            onUploadClick={() => setIsUploaderOpen(true)}
            onCreateFolder={handleCreateFolder}
            selectedItems={selectedItems}
            onDeleteSelected={handleDeleteSelected}
            onClearSelection={clearSelection}
          />
          
          <div className="flex-1 overflow-hidden flex">
            <MediaContent 
              folders={folders}
              filteredItems={filteredItems}
              selectedFolder={selectedFolder}
              onSelectFolder={selectFolder}
              onSelectMedia={handleSelectMedia}
            />
          </div>
        </div>
        
        <MediaActions onCancel={onClose} />
      </DialogContent>
      
      <MediaUploader 
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
      />
    </Dialog>
  );
};

export default MediaLibrary;
