
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
  return (
    <AnimateInView animation="slide-in-up">
      <div className="bg-background rounded-xl p-6 border border-border/50 h-full hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
        {isEditing ? (
          <div className="space-y-4">
            <div className="mb-2 p-2 bg-gray-50 border rounded-md flex justify-end">
              <select 
                value={materialObjectFitSetting} 
                onChange={e => onMaterialObjectFitChange(material.id, e.target.value as any)} 
                className="text-xs px-2 py-1 rounded border"
              >
                <option value="contain">Contain</option>
                <option value="cover">Cover</option>
                <option value="fill">Fill</option>
                <option value="scale-down">Scale Down</option>
              </select>
            </div>
            <ImageSelector 
              value={materialLocalImage || material.image} 
              onChange={url => onMaterialImageChange(material.id, url)} 
              aspectRatio={1} 
              placeholder={`Select image for ${material.title}`} 
              objectFit={materialObjectFitSetting} 
              maxHeight={100} 
            />
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Icon Image (Optional)</label>
              <ImageSelector 
                value={materialIconImage} 
                onChange={url => onMaterialIconChange(material.id, url)} 
                aspectRatio={1} 
                placeholder={`Select icon for ${material.title}`} 
                objectFit="cover" 
                maxHeight={80} 
              />
            </div>
          </div>
        ) : (
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            {materialIconImage ? (
              <img 
                src={materialIconImage} 
                alt={`${material.title} icon`} 
                className="w-full h-full object-cover rounded-full" 
              />
            ) : materialLocalImage ? (
              <img 
                src={materialLocalImage} 
                alt={material.title} 
                className={`w-full h-full object-${materialObjectFitSetting || "cover"} rounded-full`} 
              />
            ) : (
              <img 
                src={material.image} 
                alt={material.title} 
                className="w-8 h-8 object-cover rounded-full" 
              />
            )}
          </div>
        )}
        <h4 className="text-lg font-bold mb-2">{material.title}</h4>
        <p className="text-foreground/70 text-sm">
          {material.description}
        </p>
      </div>
    </AnimateInView>
  );
};

export default MaterialCard;
