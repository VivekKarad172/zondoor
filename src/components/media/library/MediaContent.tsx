
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaGrid from "../MediaGrid";
import MediaFolderList from "../MediaFolderList";
import { MediaItem, MediaFolder } from "../types";

interface MediaContentProps {
  folders: MediaFolder[];
  filteredItems: MediaItem[];
  selectedFolder: string | null;
  onSelectFolder: (folderId: string | null) => void;
  onSelectMedia: (id: string) => void;
}

const MediaContent: React.FC<MediaContentProps> = ({
  folders,
  filteredItems,
  selectedFolder,
  onSelectFolder,
  onSelectMedia,
}) => {
  return (
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
            onSelect={onSelectMedia}
            selectable
          />
        </TabsContent>
        
        <TabsContent value="folders" className="flex gap-4 flex-1 h-full m-0 overflow-hidden">
          <div className="w-56 shrink-0 overflow-y-auto border rounded-md">
            <MediaFolderList
              folders={folders}
              selectedFolder={selectedFolder}
              onSelectFolder={onSelectFolder}
            />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <MediaGrid 
              items={filteredItems}
              onSelect={onSelectMedia}
              selectable
            />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default MediaContent;
