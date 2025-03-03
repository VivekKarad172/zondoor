
import React, { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  imageDescription?: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt, imageDescription }: ImageModalProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  // Reset zoom state when the modal opens with a new image
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.5, 1));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale(prevScale => Math.min(prevScale + 0.1, 4));
    } else {
      setScale(prevScale => Math.max(prevScale - 0.1, 1));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === '+' || e.key === '=') {
          handleZoomIn();
        } else if (e.key === '-') {
          handleZoomOut();
        } else if (e.key === '0') {
          handleReset();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6 md:p-12 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-2 right-2 z-10 flex space-x-2">
          <button 
            onClick={handleZoomIn}
            className="rounded-full p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-6 w-6" />
          </button>
          <button 
            onClick={handleZoomOut}
            className="rounded-full p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-6 w-6" />
          </button>
          <button 
            onClick={handleReset}
            className="rounded-full p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Reset zoom"
          >
            <span className="font-bold text-sm">1:1</span>
          </button>
          <button 
            onClick={onClose}
            className="rounded-full p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div 
          className="relative flex-1 flex justify-center items-center h-[80vh] cursor-move overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <img 
            ref={imageRef}
            src={imageSrc} 
            alt={imageAlt} 
            className="max-h-full max-w-full object-contain"
            style={{ 
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
            draggable="false"
          />
          
          {/* Exit button in center when zoomed in */}
          {scale > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <button
                onClick={handleReset}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors flex items-center gap-2 shadow-lg"
              >
                <X className="h-4 w-4" />
                <span>Reset View</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-white">{imageAlt}</h3>
          {imageDescription && (
            <p className="text-white/80 mt-2">{imageDescription}</p>
          )}
          <p className="text-white/60 text-sm mt-4">
            Press ESC to close | Mouse wheel to zoom | Drag to move | Press 0 to reset view
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
