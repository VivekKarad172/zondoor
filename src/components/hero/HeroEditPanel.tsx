
import React from "react";
import { DoorImage } from "./types";

interface HeroEditPanelProps {
  currentImageIndex: number;
  localImages: DoorImage[];
  objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
  handleObjectFitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAltChange: (index: number, newAlt: string) => void;
  handleImageChange: (index: number, newSrc: string) => void;
  setCurrentImageIndex: (index: number) => void;
}

const HeroEditPanel = ({
  currentImageIndex,
  localImages,
  objectFit,
  handleObjectFitChange,
  handleAltChange,
  handleImageChange,
  setCurrentImageIndex
}: HeroEditPanelProps) => {
  return (
    <>
      {/* View Mode Controls */}
      <div className="mt-2 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {localImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                currentImageIndex === index ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Image viewer modal */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-16 bg-black/70">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">View Slide {currentImageIndex + 1}</h3>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Alt: {localImages[currentImageIndex].alt}</p>
            </div>
            <div className="w-full aspect-[16/9] overflow-hidden rounded-md">
              <img
                src={localImages[currentImageIndex].src}
                alt={localImages[currentImageIndex].alt}
                className="w-full h-full"
                style={{ objectFit }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroEditPanel;
