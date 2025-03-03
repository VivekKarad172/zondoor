
import React, { useState, useEffect } from "react";
import HeroSlide from "./hero/HeroSlide";
import SlideNavigation from "./hero/SlideNavigation";
import SlideDots from "./hero/SlideDots";
import HeroContent from "./hero/HeroContent";
import { DoorImage, HeroProps } from "./hero/types";

const Hero = ({ doorImages, specifications }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const defaultDoorImages: DoorImage[] = [
    {
      src: "/lovable-uploads/c9565cf2-322b-42b1-99bd-bbad8bfa8263.png",
      alt: "Premium Embossed PVC Door"
    },
    {
      src: "/lovable-uploads/75b2a0cb-8b53-4f2e-a82d-b10dded0e479.png",
      alt: "3D Embossed Design Door"
    },
    {
      src: "/lovable-uploads/8416ee93-b407-4d4d-a95a-e088714269cf.png",
      alt: "Z-ON DOOR Premium Collection"
    },
    {
      src: "/lovable-uploads/b3a0d53a-9d2a-4884-9c3b-7af3832ffff2.png",
      alt: "Z-ON DOOR Manufacturing Technology"
    },
  ];

  const defaultSpecifications: string[] = [
    "5mm PVC foam board with 0.15mm decorative film",
    "Latest technology embossing machines",
    "18mm width and 20mm thickness PVC foam board framing",
    "Internal 20×20mm MS pipe structure for durability",
    "PVC rigid sheet fillers for stability and longevity"
  ];

  const images = doorImages || defaultDoorImages;
  const specs = specifications || defaultSpecifications;

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // Auto-rotate images every 5 seconds
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    // Preload all images for smoother transitions
    images.forEach(image => {
      const img = new Image();
      img.src = image.src;
    });
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center bg-gray-50 overflow-hidden"
    >
      {/* Full-screen slideshow background */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => (
          <HeroSlide
            key={index}
            src={image.src}
            alt={image.alt}
            isActive={index === currentImageIndex}
            index={index}
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
        totalSlides={images.length}
        currentIndex={currentImageIndex}
        onDotClick={setCurrentImageIndex}
      />
    </section>
  );
};

export default Hero;
