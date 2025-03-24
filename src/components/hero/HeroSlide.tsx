
import React, { useState } from "react";

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

  // Only load active or adjacent slides to improve performance
  if (!isActive && Math.abs(index) > 1) {
    return null;
  }

  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-${objectFit} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={index <= 1 ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Simplified overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
    </div>
  );
};

export default HeroSlide;
