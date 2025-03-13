
import React, { useState } from "react";
import { AnimateInView } from "../ui/motion";
import ImageModal from "../ui/image-modal";
import ImageSelector from "@/components/media/ImageSelector";

interface ColorsTabProps {
  colors: {
    id: number;
    name: string;
    color: string;
    foil?: boolean;
    image?: string;
  }[];
  isEditable?: boolean;
  onImageChange?: (id: number, newImage: string) => void;
}

const ColorsTab = ({ colors, isEditable = false, onImageChange }: ColorsTabProps) => {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);
  const [localImages, setLocalImages] = useState<Record<number, string>>({});
  const [objectFitSettings, setObjectFitSettings] = useState<Record<number, "contain" | "cover" | "fill" | "none" | "scale-down">>({});

  const openImageModal = (imageSrc: string, imageAlt: string) => {
    setSelectedImage({
      src: imageSrc,
      alt: imageAlt
    });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleImageChange = (id: number, newImage: string) => {
    setLocalImages(prev => ({
      ...prev,
      [id]: newImage
    }));
    
    if (onImageChange) {
      onImageChange(id, newImage);
    }
  };

  const handleObjectFitChange = (id: number, value: "contain" | "cover" | "fill" | "none" | "scale-down") => {
    setObjectFitSettings(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Premium Foil Finishes</h3>
        <p className="text-gray-600">Wood-textured foil finishes provide an elegant look with the durability of PVC</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {colors.map((color, index) => (
            <AnimateInView
              key={color.id}
              animation="fade-in"
              delay={index * 100}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                {isEditable ? (
                  <div className="h-60">
                    <div className="mb-2 p-2 bg-gray-50 border-b flex justify-end">
                      <select 
                        value={objectFitSettings[color.id] || "contain"}
                        onChange={(e) => handleObjectFitChange(color.id, e.target.value as "contain" | "cover" | "fill" | "none" | "scale-down")}
                        className="text-xs px-2 py-1 rounded border"
                      >
                        <option value="contain">Contain</option>
                        <option value="cover">Cover</option>
                        <option value="fill">Fill</option>
                        <option value="scale-down">Scale Down</option>
                      </select>
                    </div>
                    <ImageSelector
                      value={localImages[color.id] || color.image || ""}
                      onChange={(url) => handleImageChange(color.id, url)}
                      aspectRatio={16/9}
                      placeholder={`Select image for ${color.name}`}
                      objectFit={objectFitSettings[color.id] || "contain"}
                    />
                  </div>
                ) : (
                  color.image ? (
                    <div 
                      className="h-60 w-full relative overflow-hidden group cursor-pointer"
                      onClick={() => openImageModal(color.image!, color.name)}
                    >
                      <img 
                        src={color.image} 
                        alt={`${color.name}`}
                        className={`w-full h-full object-${objectFitSettings[color.id] || "scale-down"} group-hover:scale-105 transition-transform duration-500`}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm p-3">
                        <p className="text-white font-medium text-sm">
                          Premium wood-textured foil finish
                        </p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
                          <span className="text-white text-sm font-medium">Click to zoom</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="h-60 w-full relative" 
                      style={{ backgroundColor: color.color }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm p-3">
                        <p className="text-white font-medium text-sm">
                          Premium foil finish
                        </p>
                      </div>
                    </div>
                  )
                )}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3">{color.name}</h3>
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-8 w-8 rounded-full border border-gray-200 shadow-sm" 
                      style={{ backgroundColor: color.color }}
                    ></div>
                    <p className="text-gray-700 font-medium">
                      {color.name}
                    </p>
                  </div>
                  <p className="mt-4 text-gray-600 text-sm">
                    Z-ON premium foil finish with wood-like texture and advanced UV protection
                  </p>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>

      {/* Image Modal for Zoom Functionality */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeImageModal}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          imageDescription="Premium foil finish with wood-like texture and advanced UV protection"
        />
      )}
    </div>
  );
};

export default ColorsTab;
