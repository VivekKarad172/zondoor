
import React from "react";
import { Button } from "@/components/ui/button";

interface MediaActionsProps {
  onCancel: () => void;
}

const MediaActions: React.FC<MediaActionsProps> = ({ onCancel }) => {
  return (
    <div className="px-6 py-3 border-t flex justify-end gap-2">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default MediaActions;
