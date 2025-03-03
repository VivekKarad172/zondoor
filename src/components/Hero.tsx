
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
      src: "/lovable-uploads/dbff8393-7a6e-4aa3-a4aa-a985f7a0c5f6.png",
      alt: "Walnut Wood Finish - Premium PVC Door"
    },
    {
      src: "/lovable-uploads/e7524959-84c6-4617-999c-5b8e0e5e2f7b.png",
      alt: "Mahogany Wood Finish - Premium PVC Door"
    },
    {
      src: "/lovable-uploads/b3e205a9-276d-4260-ad24-c55cd2df0659.png",
      alt: "Cherry Wood Finish - Premium PVC Door"
    },
    {
      src: "/lovable-uploads/d6ecdb63-a48c-4023-9661-21a657af870e.png",
      alt: "Golden Oak Wood Finish - Premium PVC Door"
    },
    {
      src: "/lovable-uploads/ac445c52-9c9c-4a4b-bb03-dba4483c9fd1.png",
      alt: "Teak Wood Finish - Premium PVC Door"
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
