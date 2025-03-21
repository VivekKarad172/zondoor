
import React, { useState, useEffect, useRef } from "react";
import { DoorImage, HeroProps } from "./types";

interface UseHeroControllerProps {
  doorImages?: DoorImage[];
}

export const useHeroController = ({ doorImages }: UseHeroControllerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [objectFit, setObjectFit] = useState<"cover" | "contain" | "fill" | "none" | "scale-down">("cover");
  const intervalRef = useRef<number | null>(null);
  const imagesLoadedRef = useRef<boolean[]>([]);
  
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

  // Preload the first two images for immediate display
  useEffect(() => {
    const preloadFirstImages = () => {
      // Preload only first two images for initial display
      for (let i = 0; i < Math.min(2, localImages.length); i++) {
        const img = new Image();
        img.onload = () => {
          // Mark image as loaded
          imagesLoadedRef.current[i] = true;
        };
        img.src = localImages[i].src;
      }
    };
    
    preloadFirstImages();
  }, [localImages]);

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
  
  // Stop slideshow when tab is not visible to save resources
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else if (!isEditing) {
      // Restart slideshow when tab becomes visible again
      intervalRef.current = window.setInterval(goToNextSlide, 5000);
    }
  };

  useEffect(() => {
    // Auto-rotate images every 5 seconds when not editing
    if (!isEditing) {
      // Add visibility change listener
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Set slide show interval
      intervalRef.current = window.setInterval(goToNextSlide, 5000);
    }
    
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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
