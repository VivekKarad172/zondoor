
import React from "react";

interface SlideDotsProps {
  totalSlides: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

const SlideDots = ({ totalSlides, currentIndex, onDotClick }: SlideDotsProps) => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentIndex 
              ? 'bg-primary scale-125' 
              : 'bg-white/50 hover:bg-white/70'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default SlideDots;
