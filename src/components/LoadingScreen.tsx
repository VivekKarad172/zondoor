
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onFinishLoading: () => void;
  duration?: number;
}

const LoadingScreen = ({ 
  onFinishLoading, 
  duration = 500
}: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simpler loading logic with no interval for better performance
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onFinishLoading();
      }, 100);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinishLoading]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-100",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-center">
        <img 
          src="/lovable-uploads/671e2f94-982a-4275-b3be-5f1834a9a2c8.png" 
          alt="Z-ON DOOR Logo" 
          className="mx-auto h-16 mb-6"
          width="180"
          height="64"
        />
        <div className="loader mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
