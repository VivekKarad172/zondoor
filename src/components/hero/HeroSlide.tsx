
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import OptimizedImage from "@/components/ui/optimized-image";

interface HeroSlideProps {
  src: string;
  alt: string;
  isActive: boolean;
  index: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const HeroSlide = ({ 
  src, 
  alt, 
  isActive, 
  index,
  objectFit = "cover" 
}: HeroSlideProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      {/* Show skeleton placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full"
        objectFit={objectFit}
        onLoad={() => setIsLoaded(true)}
        priority={index <= 1}
      />
      
      {/* Enhanced overlay gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
    </div>
  );
};

export default HeroSlide;
