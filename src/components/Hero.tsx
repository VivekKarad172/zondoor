
import React from "react";
import HeroSlide from "./hero/HeroSlide";
import SlideNavigation from "./hero/SlideNavigation";
import SlideDots from "./hero/SlideDots";
import HeroContent from "./hero/HeroContent";
import { HeroProps } from "./hero/types";
import { useHeroController } from "./hero/HeroController";

const Hero = ({ doorImages, specifications }: HeroProps) => {
  const {
    currentImageIndex,
    setCurrentImageIndex,
    objectFit,
    localImages,
    goToNextSlide,
    goToPrevSlide
  } = useHeroController({ doorImages });

  const defaultSpecifications: string[] = [
    "5mm PVC foam board with 0.15mm decorative film",
    "Latest technology embossing machines",
    "18mm width and 20mm thickness PVC foam board framing",
    "Internal 20×20mm MS pipe structure for durability",
    "PVC rigid sheet fillers for stability and longevity"
  ];

  const specs = specifications || defaultSpecifications;

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center bg-gray-50 overflow-hidden"
    >
      {/* Logo in top left corner */}
      <div className="absolute top-8 left-8 z-30">
        <img 
          src="/lovable-uploads/logo-zondoor.png" 
          alt="Z-ON DOOR Logo" 
          className="h-16 md:h-20 w-auto"
        />
      </div>

      {/* Full-screen slideshow background */}
      <div className="absolute inset-0 w-full h-full">
        {localImages.map((image, index) => (
          <HeroSlide
            key={index}
            src={image.src}
            alt={image.alt}
            isActive={index === currentImageIndex}
            index={index}
            objectFit={objectFit}
          />
        ))}

        {/* Slideshow navigation arrows */}
        <SlideNavigation
          goToPrevSlide={goToPrevSlide}
          goToNextSlide={goToNextSlide}
        />
      </div>

      {/* Content overlay */}
      <div className="wesmarc-container relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <HeroContent specifications={specs} />
      </div>

      {/* Slideshow indicator dots */}
      <SlideDots
        totalSlides={localImages.length}
        currentIndex={currentImageIndex}
        onDotClick={setCurrentImageIndex}
      />
    </section>
  );
};

export default Hero;
