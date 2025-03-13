
import React from "react";
import { AnimateInView } from "@/components/ui/motion";
import { Edit, Save } from "lucide-react";

interface ProcessHeaderProps {
  isEditing: boolean;
  onToggleEditMode: () => void;
}

const ProcessHeader: React.FC<ProcessHeaderProps> = ({ isEditing, onToggleEditMode }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <AnimateInView animation="fade-in">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
            Manufacturing Process
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
            How We Make <span className="text-gradient">Perfect Doors</span>
          </h2>
          <p className="text-foreground/80">
            Our meticulous manufacturing process ensures every door meets our stringent
            quality standards while delivering exceptional design and durability.
          </p>
        </div>
      </AnimateInView>
      
      <button 
        onClick={onToggleEditMode} 
        className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-md text-secondary hover:bg-secondary/20 transition-colors"
      >
        {isEditing ? (
          <>
            <Save className="w-4 h-4" />
            <span>Done Editing</span>
          </>
        ) : (
          <>
            <Edit className="w-4 h-4" />
            <span>Edit Images</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ProcessHeader;
