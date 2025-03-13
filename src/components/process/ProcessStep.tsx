
import React from "react";
import { Check } from "lucide-react";
import { AnimateInView } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import ImageSelector from "@/components/media/ImageSelector";

interface ProcessStepProps {
  step: {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    image: string;
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
  onObjectFitChange,
}) => {
  return (
    <AnimateInView animation="fade-in">
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-12 items-center", isEven ? "md:grid-flow-dense" : "")}>
        <div className={isEven ? "md:col-start-2" : ""}>
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                {step.icon}
              </div>
              <div className="ml-4 bg-secondary/10 text-secondary/90 rounded-full px-3 py-1 text-sm font-semibold">
                Step {step.number}
              </div>
            </div>
            <h3 className="text-2xl font-bold">{step.title}</h3>
            <p className="text-foreground/70 leading-relaxed">
              {step.description}
            </p>
            <div className="pt-2 flex items-center">
              <div className="h-1 w-20 bg-primary/30 rounded-full"></div>
              <span className="ml-2 text-primary/80 text-sm">✅ Quality Assured</span>
            </div>
          </div>
        </div>
        <div className={isEven ? "md:col-start-1" : ""}>
          {false && isEditing ? ( /* Disabled editing by setting to false */
            <div className="relative">
              <div className="mb-2 p-2 bg-gray-50 border rounded-md flex justify-end">
                <select 
                  value={objectFitSetting} 
                  onChange={e => onObjectFitChange(step.number, e.target.value as any)} 
                  className="text-xs px-2 py-1 rounded border"
                >
                  <option value="contain">Contain</option>
                  <option value="cover">Cover</option>
                  <option value="fill">Fill</option>
                  <option value="scale-down">Scale Down</option>
                </select>
              </div>
              <ImageSelector 
                value={localImage || step.image} 
                onChange={url => onImageChange(step.number, url)} 
                aspectRatio={4 / 3} 
                placeholder={`Select image for ${step.title}`} 
                objectFit={objectFitSetting} 
                readOnly={true}
              />
              <div className="absolute -bottom-4 -right-4 bg-background p-2 px-4 rounded-full shadow-lg border border-border/50 text-sm font-medium">
                {step.title}
              </div>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 transform -rotate-3 rounded-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:rotate-0"></div>
              <img 
                src={localImage || step.image} 
                alt={`Step ${step.number}: ${step.title}`} 
                loading="lazy" 
                className="object-cover" 
              />
              <div className="absolute -bottom-4 -right-4 bg-background p-2 px-4 rounded-full shadow-lg border border-border/50 text-sm font-medium">
                {step.title}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimateInView>
  );
};

export default ProcessStep;
