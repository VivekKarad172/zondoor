
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { AnimateInView } from "./ui/motion";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onFinishLoading: () => void;
  duration?: number;
}

const LoadingScreen = ({ 
  onFinishLoading, 
  duration = 800
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Preload critical images
    const imagesToPreload = [
      "/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png", // Logo
      "/lovable-uploads/c9565cf2-322b-42b1-99bd-bbad8bfa8263.png"  // Hero image
    ];
    
    // Create new image objects and set sources to preload
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // More efficient progress calculation
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (duration / 50);
        const newProgress = prev + increment;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);

    // Set timer for fade-out
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Reduced delay for exit animation to improve speed
      setTimeout(() => {
        onFinishLoading();
      }, 150);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration, onFinishLoading]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-150",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-center">
        <AnimateInView animation="fade-in" delay={0}>
          <img 
            src="/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png" 
            alt="Z-ON DOOR Logo" 
            className="mx-auto h-16 mb-6"
            width="180"
            height="64"
          />
        </AnimateInView>
        
        <AnimateInView animation="fade-in" delay={30}>
          <Loader className="w-10 h-10 text-primary animate-spin mx-auto mb-3" />
        </AnimateInView>
        
        <AnimateInView animation="fade-in" delay={50}>
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-primary transition-all duration-100 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-foreground/70 font-medium text-sm">
            Loading premium door solutions...
          </p>
        </AnimateInView>
      </div>
    </div>
  );
};

export default LoadingScreen;
