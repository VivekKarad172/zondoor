
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
        const speed = 0.05 + (index % 3) * 0.02;
        const rotation = scrollY * speed;
        const translateY = scrollY * (0.1 + (index % 4) * 0.05);
        
        doorEl.style.transform = `translateY(${translateY}px) rotate(${rotation}deg)`;
        doorEl.style.opacity = `${Math.max(0.1, 0.3 - (scrollY * 0.0003))}`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Select a subset of doors for the background
  const backgroundDoors = designOptions.filter((_, index) => index % 3 === 0).slice(0, 5);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {backgroundDoors.map((door, index) => (
        <div
          key={door.id}
          className="bg-door absolute opacity-20"
          style={{
            top: `${10 + (index * 15)}%`,
            left: `${5 + (index * 20)}%`,
            width: '200px',
            height: '300px',
            transformOrigin: 'center center',
            transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
          }}
        >
          <img
            src={door.image}
            alt=""
            className="w-full h-full object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default BackgroundDoors;
