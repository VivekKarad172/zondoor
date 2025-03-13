
import React from "react";
import HeroSlide from "./hero/HeroSlide";
import SlideNavigation from "./hero/SlideNavigation";
import SlideDots from "./hero/SlideDots";
import HeroContent from "./hero/HeroContent";
import { HeroProps } from "./hero/types";
import EditToggleButton from "./hero/EditToggleButton";
import HeroEditPanel from "./hero/HeroEditPanel";
import { useHeroController } from "./hero/HeroController";

const Hero = ({ doorImages, specifications }: HeroProps) => {
  const {
    currentImageIndex,
    setCurrentImageIndex,
    isEditing,
    objectFit,
    localImages,
    goToNextSlide,
    goToPrevSlide,
    handleImageChange,
    handleAltChange,
    handleObjectFitChange,
    toggleEditMode
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
      {/* Edit Mode Controls */}
      <div className="absolute top-4 right-4 z-30">
        <EditToggleButton isEditing={isEditing} toggleEditMode={toggleEditMode} />
        
        {isEditing && (
          <HeroEditPanel
            currentImageIndex={currentImageIndex}
            localImages={localImages}
            objectFit={objectFit}
            handleObjectFitChange={handleObjectFitChange}
            handleAltChange={handleAltChange}
            handleImageChange={handleImageChange}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </div>

      {/* Full-screen slideshow background */}
      <div className="absolute inset-0 w-full h-full">
        {!isEditing && (
          <>
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
          </>
        )}
      </div>

      {/* Content overlay */}
      <div className="wesmarc-container relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <HeroContent specifications={specs} />
      </div>

      {/* Slideshow indicator dots */}
      {!isEditing && (
        <SlideDots
          totalSlides={localImages.length}
          currentIndex={currentImageIndex}
          onDotClick={setCurrentImageIndex}
        />
      )}
    </section>
  );
};

export default Hero;
