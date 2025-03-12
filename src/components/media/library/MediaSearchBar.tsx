
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MediaSearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MediaSearchBar: React.FC<MediaSearchBarProps> = ({ 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="relative flex-grow max-w-md">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search images..."
        value={searchQuery}
        onChange={onSearchChange}
        className="pl-8"
      />
    </div>
  );
};

export default MediaSearchBar;
