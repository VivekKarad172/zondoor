
import React, { useState } from "react";
import { Check, Layers, Stamp, LayoutGrid, Scissors, PackageCheck } from "lucide-react";
import ProcessHeader from "./process/ProcessHeader";
import ProcessStep from "./process/ProcessStep";
import ProcessMaterials from "./process/ProcessMaterials";
import { processSteps, processMaterials } from "./process/processData";

const Process = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [localImages, setLocalImages] = useState<Record<string, string>>({});
  const [objectFitSettings, setObjectFitSettings] = useState<Record<string, "contain" | "cover" | "fill" | "none" | "scale-down">>({});
  const [materialLocalImages, setMaterialLocalImages] = useState<Record<string, string>>({});
  const [materialObjectFitSettings, setMaterialObjectFitSettings] = useState<Record<string, "contain" | "cover" | "fill" | "none" | "scale-down">>({});
  const [materialIconImages, setMaterialIconImages] = useState<Record<string, string>>({
    pvc: "",
    film: "",
    structure: ""
  });
  
  // Add icons to the steps
  const steps = processSteps.map((step, index) => {
    const icons = [
      <Check key="check" className="w-6 h-6" />,
      <Layers key="layers" className="w-6 h-6" />,
      <Stamp key="stamp" className="w-6 h-6" />,
      <LayoutGrid key="layout" className="w-6 h-6" />,
      <Scissors key="scissors" className="w-6 h-6" />,
      <PackageCheck key="package" className="w-6 h-6" />
    ];
    
    return {
      ...step,
      icon: icons[index]
    };
  });
  
  const materials = processMaterials;
  
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  
  const handleImageChange = (stepNumber: string, newImage: string) => {
    setLocalImages(prev => ({
      ...prev,
      [stepNumber]: newImage
    }));
  };
  
  const handleObjectFitChange = (stepNumber: string, value: "contain" | "cover" | "fill" | "none" | "scale-down") => {
    setObjectFitSettings(prev => ({
      ...prev,
      [stepNumber]: value
    }));
  };
  
  const handleMaterialImageChange = (materialId: string, newImage: string) => {
    setMaterialLocalImages(prev => ({
      ...prev,
      [materialId]: newImage
    }));
  };
  
  const handleMaterialObjectFitChange = (materialId: string, value: "contain" | "cover" | "fill" | "none" | "scale-down") => {
    setMaterialObjectFitSettings(prev => ({
      ...prev,
      [materialId]: value
    }));
  };
  
  const handleMaterialIconChange = (materialId: string, newImage: string) => {
    setMaterialIconImages(prev => ({
      ...prev,
      [materialId]: newImage
    }));
  };
  
  return (
    <section id="process" className="section-padding bg-background">
      <div className="container px-4 md:px-8 mx-auto">
        <ProcessHeader isEditing={isEditing} onToggleEditMode={toggleEditMode} />

        <div className="space-y-20 md:space-y-24">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={step}
              isEven={index % 2 === 1}
              isEditing={isEditing}
              localImage={localImages[step.number] || ""}
              objectFitSetting={objectFitSettings[step.number] || "cover"}
              onImageChange={handleImageChange}
              onObjectFitChange={handleObjectFitChange}
            />
          ))}
        </div>

        <ProcessMaterials
          materials={materials}
          isEditing={isEditing}
          materialLocalImages={materialLocalImages}
          materialObjectFitSettings={materialObjectFitSettings}
          materialIconImages={materialIconImages}
          onMaterialImageChange={handleMaterialImageChange}
          onMaterialObjectFitChange={handleMaterialObjectFitChange}
          onMaterialIconChange={handleMaterialIconChange}
        />
      </div>
    </section>
  );
};

export default Process;
