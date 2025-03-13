
import React from "react";
import { AnimateInView } from "@/components/ui/motion";
import MaterialCard from "./MaterialCard";

interface ProcessMaterialsProps {
  materials: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;
  isEditing: boolean;
  materialLocalImages: Record<string, string>;
  materialObjectFitSettings: Record<string, "contain" | "cover" | "fill" | "none" | "scale-down">;
  materialIconImages: Record<string, string>;
  onMaterialImageChange: (materialId: string, newImage: string) => void;
  onMaterialObjectFitChange: (materialId: string, value: "contain" | "cover" | "fill" | "none" | "scale-down") => void;
  onMaterialIconChange: (materialId: string, newImage: string) => void;
}

const ProcessMaterials: React.FC<ProcessMaterialsProps> = ({
  materials,
  isEditing,
  materialLocalImages,
  materialObjectFitSettings,
  materialIconImages,
  onMaterialImageChange,
  onMaterialObjectFitChange,
  onMaterialIconChange
}) => {
  return (
    <AnimateInView animation="fade-in" delay={300} className="mt-20">
      <div className="bg-secondary/20 rounded-2xl p-8 md:p-12 border border-border/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-3 text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold">
              Materials That Make the Difference
            </h3>
          </div>
          
          {materials.map((material, index) => (
            <MaterialCard
              key={material.id}
              material={material}
              isEditing={isEditing}
              materialLocalImage={materialLocalImages[material.id] || ""}
              materialObjectFitSetting={materialObjectFitSettings[material.id] || "cover"}
              materialIconImage={materialIconImages[material.id] || ""}
              onMaterialImageChange={onMaterialImageChange}
              onMaterialObjectFitChange={onMaterialObjectFitChange}
              onMaterialIconChange={onMaterialIconChange}
            />
          ))}
        </div>
      </div>
    </AnimateInView>
  );
};

export default ProcessMaterials;
