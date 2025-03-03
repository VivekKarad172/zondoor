
import React, { useState } from "react";
import { AnimateInView } from "../ui/motion";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: number;
  name: string;
  image?: string;
  color?: string;
  description?: string;
  index: number;
  type: "design" | "color" | "cnc";
  onImageClick?: (image: string, name: string) => void;
}

const ProductCard = ({ id, name, image, color, description, index, type, onImageClick }: ProductCardProps) => {
  const isColorCard = type === "color";
  const isDesignCard = type === "design";
  const isCncCard = type === "cnc";
  const [imageError, setImageError] = useState(false);
  
  const defaultDescription = 
    isDesignCard ? "Premium embossed pattern with precise detailing" :
    isColorCard ? color : 
    "Precision CNC groove detailing for added sophistication";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log(`Failed to load image: ${image}`);
    e.currentTarget.src = "/placeholder.svg";
    setImageError(true);
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
          {image && (
            <div className="relative h-full flex justify-center group cursor-pointer" 
                 onClick={() => onImageClick && image && onImageClick(image, name)}>
              <img
                src={imageError ? "/placeholder.svg" : image}
                alt={name}
                className={cn(
                  "w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105",
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
          )}
        </div>
      </div>
    </AnimateInView>
  );
};

export default ProductCard;
