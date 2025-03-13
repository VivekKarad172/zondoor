
import React, { useState, useEffect } from "react";
import HeroSlide from "./hero/HeroSlide";
import SlideNavigation from "./hero/SlideNavigation";
import SlideDots from "./hero/SlideDots";
import HeroContent from "./hero/HeroContent";
import { DoorImage, HeroProps } from "./hero/types";
import ImageSelector from "@/components/media/ImageSelector";

const Hero = ({ doorImages, specifications }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [objectFit, setObjectFit] = useState<"cover" | "contain" | "fill" | "none" | "scale-down">("cover");
  
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

  const [localImages, setLocalImages] = useState<DoorImage[]>(doorImages || defaultDoorImages);
  const specs = specifications || defaultSpecifications;

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === localImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? localImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // Auto-rotate images every 5 seconds when not editing
    if (!isEditing) {
      const interval = setInterval(() => {
        goToNextSlide();
      }, 5000);
      
      // Preload all images for smoother transitions
      localImages.forEach(image => {
        const img = new Image();
        img.src = image.src;
      });
      
      return () => clearInterval(interval);
    }
  }, [isEditing, localImages]);

  const handleImageChange = (index: number, newSrc: string) => {
    const newImages = [...localImages];
    newImages[index] = { ...newImages[index], src: newSrc };
    setLocalImages(newImages);
  };

  const handleAltChange = (index: number, newAlt: string) => {
    const newImages = [...localImages];
    newImages[index] = { ...newImages[index], alt: newAlt };
    setLocalImages(newImages);
  };

  const handleObjectFitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setObjectFit(e.target.value as "cover" | "contain" | "fill" | "none" | "scale-down");
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center bg-gray-50 overflow-hidden"
    >
      {/* Edit Mode Controls */}
      <div className="absolute top-4 right-4 z-30">
        <button 
          onClick={toggleEditMode}
          className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-md text-sm font-medium shadow-md border border-gray-200"
        >
          {isEditing ? "Exit Edit Mode" : "Edit Slideshow"}
        </button>
        
        {isEditing && (
          <div className="mt-2 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-medium">Object Fit:</label>
              <select
                value={objectFit}
                onChange={handleObjectFitChange}
                className="text-xs px-2 py-1 rounded border"
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
                <option value="fill">Fill</option>
                <option value="scale-down">Scale Down</option>
              </select>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {localImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    currentImageIndex === index ? 'bg-primary text-white' : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full-screen slideshow background */}
      <div className="absolute inset-0 w-full h-full">
        {isEditing ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-16 bg-black/70">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-medium">Edit Slide {currentImageIndex + 1}</h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={localImages[currentImageIndex].alt}
                    onChange={(e) => handleAltChange(currentImageIndex, e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <ImageSelector
                  value={localImages[currentImageIndex].src}
                  onChange={(url) => handleImageChange(currentImageIndex, url)}
                  aspectRatio={16/9}
                  placeholder="Select hero image"
                  objectFit={objectFit}
                />
              </div>
            </div>
          </div>
        ) : (
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
