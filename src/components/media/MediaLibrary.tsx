
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaGrid from "./MediaGrid";
import MediaUploader from "./MediaUploader";
import MediaFolderList from "./MediaFolderList";
import { useMedia } from "@/contexts/MediaContext";
import { Search, Upload, FolderPlus, Trash2 } from "lucide-react";

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
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      await createFolder(newFolderName);
      setNewFolderName("");
      setIsCreatingFolder(false);
    }
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
          <div className="px-6 py-3 bg-muted/20 border-b flex flex-wrap gap-2 items-center justify-between">
            <div className="flex items-center gap-2 flex-grow">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search images..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-8"
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setIsUploaderOpen(true)}
                className="gap-1"
              >
                <Upload className="h-4 w-4" />
                Upload
              </Button>
              
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
            </div>
            
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedItems.length} selected
                </span>
                <Button 
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                  className="gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSelection}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-hidden flex">
            <Tabs defaultValue="all" className="flex-1 flex flex-col h-full">
              <div className="px-6 pt-4 flex gap-4">
                <div className="w-56 shrink-0">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="all" className="flex-1">All Media</TabsTrigger>
                    <TabsTrigger value="folders" className="flex-1">Folders</TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden flex px-6 pb-6 gap-4">
                <TabsContent value="all" className="flex-1 h-full m-0 overflow-hidden">
                  <MediaGrid 
                    items={filteredItems}
                    onSelect={handleSelectMedia}
                    selectable
                  />
                </TabsContent>
                
                <TabsContent value="folders" className="flex gap-4 flex-1 h-full m-0 overflow-hidden">
                  <div className="w-56 shrink-0 overflow-y-auto border rounded-md">
                    <MediaFolderList
                      folders={folders}
                      selectedFolder={selectedFolder}
                      onSelectFolder={selectFolder}
                    />
                  </div>
                  
                  <div className="flex-1 overflow-hidden">
                    <MediaGrid 
                      items={filteredItems}
                      onSelect={handleSelectMedia}
                      selectable
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
        
        <div className="px-6 py-3 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
      
      <MediaUploader 
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
      />
    </Dialog>
  );
};

export default MediaLibrary;
