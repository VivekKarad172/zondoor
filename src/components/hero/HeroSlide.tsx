
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

  // Get the Tailwind class based on objectFit prop
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
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      {/* Show placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${getObjectFitClass()} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        loading={index === 0 ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        width="1920"
        height="1080"
        fetchPriority={index === 0 ? "high" : "auto"}
      />
      
      {/* Enhanced overlay gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
    </div>
  );
};

export default HeroSlide;
