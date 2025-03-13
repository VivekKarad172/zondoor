
import React, { useState } from "react";
import { AnimateInView } from "../ui/motion";
import { cn } from "@/lib/utils";
import ImageSelector from "@/components/media/ImageSelector";

interface ProductCardProps {
  id: number;
  name: string;
  image?: string;
  color?: string;
  description?: string;
  index: number;
  type: "design" | "color" | "cnc";
  onImageClick?: (image: string, name: string) => void;
  onImageChange?: (id: number, newImage: string) => void;
  isEditable?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const ProductCard = ({ 
  id, 
  name, 
  image, 
  color, 
  description, 
  index, 
  type, 
  onImageClick, 
  onImageChange,
  isEditable = false,
  objectFit = "contain"
}: ProductCardProps) => {
  const isColorCard = type === "color";
  const isDesignCard = type === "design";
  const isCncCard = type === "cnc";
  const [localImage, setLocalImage] = useState(image || "");
  const [imageError, setImageError] = useState(false);
  const [localObjectFit, setLocalObjectFit] = useState<"contain" | "cover" | "fill" | "none" | "scale-down">(objectFit);
  
  const defaultDescription = 
    isDesignCard ? "Premium embossed pattern with precise detailing" :
    isColorCard ? color : 
    "Precision CNC groove detailing for added sophistication";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log(`Failed to load image: ${image}`);
    e.currentTarget.src = "/placeholder.svg";
    setImageError(true);
  };

  const handleImageChange = (newImage: string) => {
    setLocalImage(newImage);
    if (onImageChange) {
      onImageChange(id, newImage);
    }
  };

  const handleObjectFitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalObjectFit(e.target.value as "contain" | "cover" | "fill" | "none" | "scale-down");
  };

  // This component is now only used for design and CNC cards
  // Color cards are directly rendered in ColorsTab.tsx
  if (isColorCard) {
    return null;
  }

  return (
    <AnimateInView
      key={id}
      animation="fade-in"
      delay={index * 100}
    >
      <div className={cn(
        "bg-white rounded-md overflow-hidden shadow-md transition-all duration-300 h-full",
        "group hover:shadow-lg"
      )}>
        <div className="relative overflow-hidden">
          {false && isEditable ? ( /* Disabled editing by setting to false */
            <>
              <div className="mb-2 p-2 bg-gray-50 border-b flex justify-end">
                <select 
                  value={localObjectFit}
                  onChange={handleObjectFitChange}
                  className="text-xs px-2 py-1 rounded border"
                >
                  <option value="contain">Contain</option>
                  <option value="cover">Cover</option>
                  <option value="fill">Fill</option>
                  <option value="scale-down">Scale Down</option>
                </select>
              </div>
              <ImageSelector
                value={localImage}
                onChange={handleImageChange}
                aspectRatio={16/9}
                placeholder={`Select image for ${isDesignCard ? 'Design' : 'CNC Pattern'} ${name}`}
                objectFit={localObjectFit}
                readOnly={true}
              />
            </>
          ) : (
            image && (
              <div className="relative h-full flex justify-center group cursor-pointer" 
                   onClick={() => onImageClick && image && onImageClick(image, name)}>
                <img
                  src={imageError ? "/placeholder.svg" : image}
                  alt={name}
                  className={cn(
                    `w-auto max-w-full object-${objectFit} transition-transform duration-500 group-hover:scale-105`,
                    "min-h-[350px] max-h-[350px]"
                  )}
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-lg font-bold">
                      {isDesignCard ? `Design ${name}` : `CNC Pattern #${id}`}
                    </p>
                    <p className="text-white/90 text-sm mt-1">
                      {description || defaultDescription}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
                    <span className="text-white text-sm font-medium">Click to zoom</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </AnimateInView>
  );
};

export default ProductCard;
