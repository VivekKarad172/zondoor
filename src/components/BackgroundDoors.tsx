
import React, { useEffect, useRef, useState } from "react";
import { designOptions } from "./product/ProductData";
import ImageSelector from "@/components/media/ImageSelector";

const BackgroundDoors = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoorIndex, setSelectedDoorIndex] = useState<number | null>(null);
  const [localBackgroundDoors, setLocalBackgroundDoors] = useState(
    designOptions.filter((_, index) => index % 2 === 0).slice(0, 10).map(door => ({
      id: door.id,
      image: "/placeholder.svg"
    }))
  );
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isEditing) return;
      
      const doors = containerRef.current.querySelectorAll('.bg-door');
      const scrollY = window.scrollY;
      
      doors.forEach((door, index) => {
        const doorEl = door as HTMLElement;
        // Increase rotation and movement for more dramatic effect
        const speed = 0.18 + (index % 3) * 0.05;
        const rotation = scrollY * speed;
        const translateY = scrollY * (0.25 + (index % 4) * 0.05);
        const translateX = Math.sin(scrollY * 0.003) * (25 + (index % 3) * 15);
        const scale = 1 + Math.sin(scrollY * 0.001) * 0.1;
        
        doorEl.style.transform = `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotation}deg) scale(${scale})`;
        doorEl.style.opacity = `${Math.max(0.2, 0.5 - (scrollY * 0.0003))}`;
      });
    };
    
    // Call handler once to initialize positions
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEditing]);

  const handleImageChange = (index: number, newImage: string) => {
    const newDoors = [...localBackgroundDoors];
    newDoors[index] = { ...newDoors[index], image: newImage };
    setLocalBackgroundDoors(newDoors);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setSelectedDoorIndex(null);
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Edit Mode Controls */}
      {isEditing && (
        <div className="pointer-events-auto absolute top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-sm">Edit Background Doors</h3>
            <button 
              onClick={toggleEditMode}
              className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              Done
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {localBackgroundDoors.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedDoorIndex(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  selectedDoorIndex === index ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          {selectedDoorIndex !== null && (
            <div className="pointer-events-auto">
              <ImageSelector
                value={localBackgroundDoors[selectedDoorIndex].image}
                onChange={(url) => handleImageChange(selectedDoorIndex, url)}
                aspectRatio={3/4}
                placeholder="Select background door image"
              />
            </div>
          )}
        </div>
      )}

      {!isEditing && (
        <button 
          onClick={toggleEditMode}
          className="pointer-events-auto absolute top-4 left-4 z-50 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-md text-xs font-medium shadow-md border border-gray-200"
        >
          Edit Background
        </button>
      )}
      
      {localBackgroundDoors.map((door, index) => (
        <div
          key={door.id}
          className="bg-door absolute opacity-30"
          style={{
            top: `${(index % 5) * 18}%`,
            left: `${(index % 4) * 25}%`,
            width: '300px',
            height: '400px',
            transformOrigin: 'center center',
            transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
            zIndex: -10 - index
          }}
        >
          <img
            src={door.image !== "/placeholder.svg" ? door.image : "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover rounded-lg shadow-xl"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default BackgroundDoors;
