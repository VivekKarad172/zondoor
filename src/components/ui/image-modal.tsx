
import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  imageDescription?: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt, imageDescription }: ImageModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 md:p-12 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full bg-background rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-2 right-2 z-10">
          <button 
            onClick={onClose}
            className="rounded-full p-2 bg-background/80 text-foreground hover:bg-background transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="relative bg-background p-4">
          <div className="flex justify-center mb-4 rounded-md overflow-hidden">
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className={cn(
                "max-h-[70vh] w-auto object-contain",
                "transition-transform duration-300 transform hover:scale-105"
              )} 
            />
          </div>
          
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold">{imageAlt}</h3>
            {imageDescription && (
              <p className="text-foreground/70 mt-2">{imageDescription}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
