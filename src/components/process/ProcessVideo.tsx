
import React, { useEffect, useRef, useState } from "react";
import { AnimateInView } from "@/components/ui/motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { processSteps } from "./processData";

const ProcessVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const totalDuration = 30000; // 30 seconds total animation
  const stepDuration = totalDuration / processSteps.length;
  const startTimeRef = useRef<number | null>(null);
  
  const resetAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    startTimeRef.current = null;
    setProgress(0);
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = startTimeRef.current || Date.now() - (progress * totalDuration);
      
      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - (startTimeRef.current || currentTime);
        const newProgress = Math.min(elapsed / totalDuration, 1);
        setProgress(newProgress);
        
        // Calculate current step based on progress
        const newStep = Math.min(
          Math.floor(newProgress * processSteps.length),
          processSteps.length - 1
        );
        setCurrentStep(newStep);
        
        if (newProgress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsPlaying(false);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl bg-white">
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute top-0 right-0 p-4 z-10">
          <img 
            src="/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png" 
            alt="Z-ON DOOR Logo" 
            className="h-10 opacity-70"
          />
        </div>
        
        {/* Animation Stage */}
        <div className="absolute inset-0 bg-gray-50">
          {processSteps.map((step, index) => (
            <AnimateProcess 
              key={index}
              step={step}
              isActive={index === currentStep}
              isComplete={index < currentStep}
              progress={
                index === currentStep
                  ? (progress * processSteps.length) % 1
                  : index < currentStep ? 1 : 0
              }
            />
          ))}
        </div>
        
        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 flex items-center justify-between">
          <div className="text-white font-medium flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold">
              {currentStep + 1}
            </div>
            <span>{processSteps[currentStep].title}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm"
              onClick={resetAnimation}
            >
              <RotateCcw size={16} className="text-white" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause size={18} className="text-white" />
              ) : (
                <Play size={18} className="text-white ml-0.5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/30">
          <div 
            className="h-full bg-primary transition-all duration-100 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
      
      {/* Step indicators */}
      <div className="grid grid-cols-6 bg-gray-50 border-t">
        {processSteps.map((step, index) => (
          <button
            key={index}
            className={`py-3 px-1 text-xs font-medium border-b-2 transition-colors ${
              index === currentStep 
                ? "border-primary text-primary" 
                : "border-transparent text-gray-500"
            }`}
            onClick={() => {
              setCurrentStep(index);
              setProgress(index / processSteps.length);
              startTimeRef.current = Date.now() - (index / processSteps.length * totalDuration);
              if (!isPlaying) setIsPlaying(true);
            }}
          >
            Step {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

interface AnimateProcessProps {
  step: {
    number: string;
    title: string;
    description: string;
    image: string;
  };
  isActive: boolean;
  isComplete: boolean;
  progress: number;
}

const AnimateProcess: React.FC<AnimateProcessProps> = ({ 
  step, 
  isActive,
  isComplete,
  progress 
}) => {
  if (!isActive && !isComplete) return null;
  
  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{ 
        background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.9) 100%)` 
      }}
    >
      <div className="max-w-xl mx-auto px-6 text-center relative">
        <div 
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: `url(${step.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)'
          }}
        />
        
        <div className="inline-block mb-4 transform transition-transform duration-1000"
             style={{ 
               transform: `scale(${isActive ? Math.min(0.5 + progress * 0.5, 1) : 1})`,
               opacity: isActive ? Math.min(0.3 + progress * 0.7, 1) : 1
             }}>
          <img 
            src={step.image} 
            alt={step.title} 
            className="rounded-lg shadow-lg max-h-52 mx-auto"
          />
        </div>
        
        <div className="space-y-3">
          <h3 
            className="text-xl md:text-2xl font-bold transform transition-all duration-700"
            style={{ 
              opacity: isActive ? Math.min(progress * 2, 1) : 1,
              transform: `translateY(${isActive ? Math.max(20 - progress * 20, 0) : 0}px)`
            }}
          >
            <span className="text-primary mr-2">Step {step.number}:</span> 
            {step.title}
          </h3>
          
          <p 
            className="text-gray-700 max-w-md mx-auto transform transition-all duration-700 delay-100"
            style={{ 
              opacity: isActive ? Math.max(0, Math.min((progress - 0.3) * 2, 1)) : 1,
              transform: `translateY(${isActive ? Math.max(15 - Math.max(0, progress - 0.3) * 30, 0) : 0}px)`
            }}
          >
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessVideo;
