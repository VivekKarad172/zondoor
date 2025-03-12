
import React from "react";
import { MediaItem } from "./types";
import { useMedia } from "@/contexts/MediaContext";
import { cn } from "@/lib/utils";
import { Check, AlertCircle, FileText, Video } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MediaGridProps {
  items: MediaItem[];
  onSelect?: (id: string) => void;
  selectable?: boolean;
}

const MediaGrid: React.FC<MediaGridProps> = ({ 
  items, 
  onSelect,
  selectable = false
}) => {
  const { selectedItems, selectItem, deselectItem, isLoading } = useMedia();

  const handleItemClick = (id: string) => {
    if (onSelect) {
      onSelect(id);
    } else if (selectable) {
      if (selectedItems.includes(id)) {
        deselectItem(id);
      } else {
        selectItem(id);
      }
    }
  };

  const renderThumbnail = (item: MediaItem) => {
    switch (item.type) {
      case "image":
        return (
          <img 
            src={item.url} 
            alt={item.name}
            className="w-full h-full object-scale-down" // Changed to scale-down
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        );
      case "video":
        return (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Video className="h-12 w-12 text-muted-foreground" />
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto h-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-6">
        <AlertCircle className="h-12 w-12 mb-4" />
        <p className="text-lg font-medium">No items found</p>
        <p className="text-sm">Try uploading some media or changing your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto h-full">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item.id)}
          className={cn(
            "group relative overflow-hidden rounded-md border border-border hover:border-primary transition-all cursor-pointer",
            selectedItems.includes(item.id) && "ring-2 ring-primary"
          )}
        >
          <div className="aspect-square overflow-hidden bg-muted">
            {renderThumbnail(item)}
          </div>
          
          <div className="p-2 bg-background border-t truncate">
            <div className="text-sm font-medium truncate">{item.name}</div>
            <div className="text-xs text-muted-foreground">
              {(item.size / 1024).toFixed(0)} KB
            </div>
          </div>
          
          {selectable && (
            <div 
              className={cn(
                "absolute top-2 right-2 h-5 w-5 rounded-full flex items-center justify-center transition-all",
                selectedItems.includes(item.id) 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background/80 text-muted-foreground opacity-0 group-hover:opacity-100"
              )}
            >
              {selectedItems.includes(item.id) && (
                <Check className="h-3 w-3" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
