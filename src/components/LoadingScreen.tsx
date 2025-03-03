
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
  duration = 3000 
}: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Add a small delay for the exit animation
      setTimeout(() => {
        onFinishLoading();
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinishLoading]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-center">
        <AnimateInView animation="fade-in" delay={200}>
          <img 
            src="/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png" 
            alt="Z-ON DOOR Logo" 
            className="mx-auto h-16 mb-6"
          />
        </AnimateInView>
        
        <AnimateInView animation="fade-in" delay={400}>
          <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        </AnimateInView>
        
        <AnimateInView animation="fade-in" delay={600}>
          <p className="text-foreground/70 font-medium">
            Loading premium door solutions...
          </p>
        </AnimateInView>
      </div>
    </div>
  );
};

export default LoadingScreen;
