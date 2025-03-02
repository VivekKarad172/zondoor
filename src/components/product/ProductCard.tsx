
import React from "react";
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
  
  const defaultDescription = 
    isDesignCard ? "Premium embossed pattern with precise detailing" :
    isColorCard ? color : 
    "Precision CNC groove detailing for added sophistication";
  
  return (
    <AnimateInView
      key={id}
      animation="fade-in"
      delay={index * 100}
    >
      <div className={cn(
        "bg-white rounded-xl overflow-hidden border border-border transition-all duration-300 h-full",
        !isColorCard && "group hover:shadow-xl"
      )}>
        {!isColorCard && (
          <div className="relative overflow-hidden">
            {image && (
              <img
                src={image}
                alt={name}
                className={cn(
                  "w-full object-cover transition-transform duration-500 group-hover:scale-105",
                  isDesignCard ? "aspect-[4/3]" : "h-full"
                )}
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image: ${image}`);
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">
                  {isDesignCard ? `Design ${name}` : `CNC Pattern #${id}`}
                </p>
                <p className="text-white/90 text-xs mt-1">
                  {isDesignCard ? "Premium quality PVC embossed door" : "Precision CNC grooves for unique styling"}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {isColorCard && (
          <div
            className="h-48 w-full"
            style={{ backgroundColor: color }}
          ></div>
        )}
        
        <div className="p-6">
          <h3 className="font-bold text-lg mb-2">{name}</h3>
          
          {isColorCard ? (
            <div className="flex items-center gap-2">
              <div
                className="h-6 w-6 rounded-full border border-border/50"
                style={{ backgroundColor: color }}
              ></div>
              <p className="text-foreground/70 text-sm">
                {color}
              </p>
            </div>
          ) : (
            <p className="text-foreground/70 text-sm">
              {description || defaultDescription}
            </p>
          )}
        </div>
      </div>
    </AnimateInView>
  );
};

export default ProductCard;
