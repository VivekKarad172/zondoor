
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [error, setError] = useState(false);
  
  // Function to check if WebP is supported
  const supportsWebP = (): boolean => {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };
  
  // Convert image URLs to WebP format if supported
  const getOptimizedSrc = () => {
    // Skip optimization for external URLs or SVGs
    if (src.startsWith('http') || src.endsWith('.svg') || !src.startsWith('/')) {
      return src;
    }
    
    // For local images, use WebP if supported
    if (typeof window !== 'undefined' && supportsWebP()) {
      // If the image is already WebP, return as is
      if (src.endsWith('.webp')) return src;
      
      // Handle lovable uploads path specially
      if (src.includes('/lovable-uploads/')) {
        const parts = src.split('.');
        const ext = parts.pop();
        return `${parts.join('.')}.webp`;
      }
      
      // Add .webp extension to other local images
      return src.replace(/\.(jpe?g|png)$/i, '.webp');
    }
    
    return src;
  };
  
  // Generate responsive sizes based on viewport width
  const getSizes = () => {
    if (width && width < 768) return `${width}px`;
    return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setError(true);
    setIsLoaded(true);
  };

  // Determine if this image should be lazy loaded
  // Priority images or those in the viewport on load are not lazy loaded
  const shouldLazyLoad = !priority;
  
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
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 text-muted-foreground text-sm">
          Failed to load image
        </div>
      ) : (
        <img
          src={getOptimizedSrc()}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            getObjectFitClass(),
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          loading={shouldLazyLoad ? "lazy" : "eager"}
          onLoad={handleImageLoad}
          onError={handleImageError}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          sizes={getSizes()}
          data-optimized="true"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
