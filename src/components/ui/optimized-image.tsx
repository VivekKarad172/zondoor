
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoad?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  objectFit = "cover",
  onLoad
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simplified source optimization
  const getOptimizedSrc = () => {
    // Skip optimization for external URLs, data URLs or SVGs
    if (src.startsWith('http') || src.startsWith('data:') || src.endsWith('.svg')) {
      return src;
    }
    return src;
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Use object-fit property based on the prop
  const getObjectFitClass = () => {
    switch(objectFit) {
      case "cover": return "object-cover";
      case "contain": return "object-contain";
      case "fill": return "object-fill";
      case "none": return "object-none";
      case "scale-down": return "object-scale-down";
      default: return "object-cover";
    }
  };

  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded"></div>
      )}
      <img
        src={getOptimizedSrc()}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "w-full h-full transition-opacity duration-200",
          getObjectFitClass(),
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleImageLoad}
        decoding="async"
      />
    </div>
  );
};

export default OptimizedImage;
