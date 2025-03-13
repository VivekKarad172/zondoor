
import React from "react";
import { AnimateInView } from "@/components/ui/motion";
import ImageSelector from "@/components/media/ImageSelector";

interface MaterialCardProps {
  material: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
  isEditing: boolean;
  materialLocalImage: string;
  materialObjectFitSetting: "contain" | "cover" | "fill" | "none" | "scale-down";
  materialIconImage: string;
  onMaterialImageChange: (materialId: string, newImage: string) => void;
  onMaterialObjectFitChange: (materialId: string, value: "contain" | "cover" | "fill" | "none" | "scale-down") => void;
  onMaterialIconChange: (materialId: string, newImage: string) => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  isEditing,
  materialLocalImage,
  materialObjectFitSetting,
  materialIconImage,
  onMaterialImageChange,
  onMaterialObjectFitChange,
  onMaterialIconChange
}) => {
  const imageUrl = materialLocalImage || material.image;
  
  return (
    <AnimateInView animation="slide-in-up" className="flex flex-col">
      <div className="relative h-52 mb-4 rounded-lg overflow-hidden">
        <ImageSelector
          value={imageUrl}
          onChange={(newImage) => onMaterialImageChange(material.id, newImage)}
          objectFit={materialObjectFitSetting}
          aspectRatio={16/9}
          readOnly={!isEditing}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            {materialIconImage ? (
              <img
                src={materialIconImage}
                alt={material.title}
                className="w-6 h-6 object-contain"
              />
            ) : (
              <div className="w-6 h-6 bg-primary/20 rounded-full"></div>
            )}
          </div>
          <h4 className="text-xl font-semibold">{material.title}</h4>
        </div>
        
        <p className="text-foreground/70 text-sm">{material.description}</p>
      </div>
    </AnimateInView>
  );
};

export default MaterialCard;
