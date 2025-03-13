
import React from "react";

interface EditToggleButtonProps {
  isEditing: boolean;
  toggleEditMode: () => void;
}

const EditToggleButton = ({ isEditing, toggleEditMode }: EditToggleButtonProps) => {
  return (
    <button 
      onClick={toggleEditMode}
      className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-md text-sm font-medium shadow-md border border-gray-200"
    >
      {isEditing ? "Exit Edit Mode" : "Edit Slideshow"}
    </button>
  );
};

export default EditToggleButton;
