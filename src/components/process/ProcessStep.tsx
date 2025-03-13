import React from "react";
import { AnimateInView } from "@/components/ui/motion";
interface ProcessStepProps {
  step: {
    number: string;
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
  };
  isEven: boolean;
  isEditing: boolean;
  localImage: string;
  objectFitSetting: "contain" | "cover" | "fill" | "none" | "scale-down";
  onImageChange: (stepNumber: string, newImage: string) => void;
  onObjectFitChange: (stepNumber: string, value: "contain" | "cover" | "fill" | "none" | "scale-down") => void;
}
const ProcessStep: React.FC<ProcessStepProps> = ({
  step,
  isEven,
  isEditing,
  localImage,
  objectFitSetting,
  onImageChange,
  onObjectFitChange
}) => {
  const imageUrl = localImage || step.image;
  return <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
      <AnimateInView animation={isEven ? "slide-in-left" : "slide-in-right"} className="w-full h-full min-h-[300px] relative rounded-xl overflow-hidden">
        <img src={imageUrl} alt={step.title} style={{
        objectFit: objectFitSetting
      }} className="w-full h-full object-scale-down" />
      </AnimateInView>

      <AnimateInView animation={isEven ? "slide-in-right" : "slide-in-left"} className={`flex flex-col ${isEven ? 'lg:items-end lg:text-right' : ''}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center ${isEven ? 'order-last' : ''}`}>
            {step.icon}
          </div>
          <span className="text-lg font-semibold text-primary">Step {step.number}</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{step.title}</h3>
        <p className="text-foreground/80 leading-relaxed">{step.description}</p>
      </AnimateInView>
    </div>;
};
export default ProcessStep;