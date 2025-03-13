
import React, { useState, useEffect } from "react";
import { DoorImage, HeroProps } from "./types";

interface UseHeroControllerProps {
  doorImages?: DoorImage[];
}

export const useHeroController = ({ doorImages }: UseHeroControllerProps) => {
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

  const [localImages, setLocalImages] = useState<DoorImage[]>(doorImages || defaultDoorImages);

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

  // This function is now just for display, not editing
  const handleImageChange = (index: number, newSrc: string) => {
    // Disabled editing functionality
    console.log("Image editing is disabled");
  };

  const handleAltChange = (index: number, newAlt: string) => {
    // Disabled editing functionality
    console.log("Alt text editing is disabled");
  };

  const handleObjectFitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setObjectFit(e.target.value as "cover" | "contain" | "fill" | "none" | "scale-down");
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return {
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
  };
};

export default useHeroController;
