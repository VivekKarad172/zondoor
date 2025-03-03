
import React from "react";

interface HeroSlideProps {
  src: string;
  alt: string;
  isActive: boolean;
  index: number;
}

const HeroSlide = ({ src, alt, isActive, index }: HeroSlideProps) => {
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading={index === 0 ? "eager" : "lazy"}
      />
      {/* Overlay gradient - reduced opacity for better visibility */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/60 to-transparent"></div>
    </div>
  );
};

export default HeroSlide;
