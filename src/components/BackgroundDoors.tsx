
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
  }, []);
  
  // Use more doors and better distribution
  const backgroundDoors = designOptions.filter((_, index) => index % 2 === 0).slice(0, 10);
  
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
            src={door.image || "/door-images/placeholder.jpg"}
            alt=""
            className="w-full h-full object-cover rounded-lg shadow-xl"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/door-images/placeholder.jpg";
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BackgroundDoors;
