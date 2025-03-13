
import React from "react";
import { DoorImage } from "./types";
import ImageSelector from "@/components/media/ImageSelector";

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
  // Disable editing by making ImageSelector readOnly
  return (
    <>
      {/* Edit Mode Controls */}
      <div className="mt-2 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <label className="text-xs font-medium">Object Fit:</label>
          <select
            value={objectFit}
            onChange={handleObjectFitChange}
            className="text-xs px-2 py-1 rounded border"
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="fill">Fill</option>
            <option value="scale-down">Scale Down</option>
          </select>
        </div>
        
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

      {/* Full-screen edit modal */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-16 bg-black/70">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">View Slide {currentImageIndex + 1}</h3>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <input
                type="text"
                value={localImages[currentImageIndex].alt}
                onChange={(e) => handleAltChange(currentImageIndex, e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                readOnly
              />
            </div>
            <ImageSelector
              value={localImages[currentImageIndex].src}
              onChange={(url) => handleImageChange(currentImageIndex, url)}
              aspectRatio={16/9}
              placeholder="View hero image"
              objectFit={objectFit}
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroEditPanel;
