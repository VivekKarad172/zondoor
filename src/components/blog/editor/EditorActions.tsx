
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface EditorActionsProps {
  onSave: () => void;
  onCancel: () => void;
  isNew: boolean;
}

const EditorActions = ({ onSave, onCancel, isNew }: EditorActionsProps) => {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
        <X size={16} />
        Cancel
      </Button>
      <Button onClick={onSave} className="flex items-center gap-2">
        <Save size={16} />
        {isNew ? "Publish Post" : "Update Post"}
      </Button>
    </div>
  );
};

export default EditorActions;
