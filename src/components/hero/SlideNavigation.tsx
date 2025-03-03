
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideNavigationProps {
  goToPrevSlide: () => void;
  goToNextSlide: () => void;
}

const SlideNavigation = ({ goToPrevSlide, goToNextSlide }: SlideNavigationProps) => {
  return (
    <>
      <button 
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button 
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>
    </>
  );
};

export default SlideNavigation;
