
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
}

const ProductCard = ({ id, name, image, color, description, index, type }: ProductCardProps) => {
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

  return (
    <AnimateInView
      key={id}
      animation="fade-in"
      delay={index * 100}
    >
      <div className={cn(
        "bg-white rounded-xl overflow-hidden border border-border shadow-sm transition-all duration-300 h-full",
        !isColorCard && "group hover:shadow-xl"
      )}>
        {!isColorCard && (
          <div className="relative overflow-hidden">
            {image && (
              <div className="relative">
                <img
                  src={imageError ? "/placeholder.svg" : image}
                  alt={name}
                  className={cn(
                    "w-full object-cover transition-transform duration-500",
                    isDesignCard ? "aspect-[3/4]" : "h-full"
                  )}
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-lg font-bold">
                      {isDesignCard ? `Design ${name}` : `CNC Pattern #${id}`}
                    </p>
                    <p className="text-white/90 text-sm mt-1">
                      {isDesignCard ? "Premium quality PVC embossed door" : "Precision CNC grooves for unique styling"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {isColorCard && (
          <div className="h-full flex flex-col">
            <div
              className="h-48 w-full"
              style={{ backgroundColor: color }}
            ></div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{name}</h3>
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full border border-border/50"
                  style={{ backgroundColor: color }}
                ></div>
                <p className="text-foreground/70 text-sm">
                  {color}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimateInView>
  );
};

export default ProductCard;
