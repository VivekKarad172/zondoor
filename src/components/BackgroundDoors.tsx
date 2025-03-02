
import React, { useEffect, useRef } from "react";
import { designOptions } from "./product/ProductData";

const BackgroundDoors = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const doors = containerRef.current.querySelectorAll('.bg-door');
      const scrollY = window.scrollY;
      
      doors.forEach((door, index) => {
        const doorEl = door as HTMLElement;
        // Increase rotation and movement for more noticeable effect
        const speed = 0.15 + (index % 3) * 0.05;
        const rotation = scrollY * speed;
        const translateY = scrollY * (0.2 + (index % 4) * 0.05);
        const translateX = Math.sin(scrollY * 0.002) * (20 + (index % 3) * 10);
        
        doorEl.style.transform = `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotation}deg)`;
        doorEl.style.opacity = `${Math.max(0.2, 0.4 - (scrollY * 0.0003))}`;
      });
    };
    
    // Call handler once to initialize positions
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Use more doors and distribute them better
  const backgroundDoors = designOptions.filter((_, index) => index % 2 === 0).slice(0, 8);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {backgroundDoors.map((door, index) => (
        <div
          key={door.id}
          className="bg-door absolute opacity-30"
          style={{
            top: `${5 + (index * 10)}%`,
            left: `${(index % 4) * 25}%`,
            width: '250px',
            height: '350px',
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
            zIndex: -10 - index
          }}
        >
          <img
            src={door.image || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"}
            alt=""
            className="w-full h-full object-cover rounded-lg shadow-xl"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e";
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BackgroundDoors;
