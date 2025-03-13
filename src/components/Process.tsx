import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "./ui/motion";
import { Check, Layers, Stamp, LayoutGrid, Scissors, PackageCheck, Edit, Save } from "lucide-react";
import ImageSelector from "@/components/media/ImageSelector";

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

  const steps = [
    {
      number: "01",
      title: "Material Selection",
      description:
        "We use 5mm sheets with a smooth surface for the best film application. Any low-quality materials are rejected to ensure customers receive only the highest quality doors.",
      icon: <Check className="w-6 h-6" />,
      image: "/lovable-uploads/2c463714-b7b4-4e2f-b451-9d128a134df8.png", // Step 1 image
    },
    {
      number: "02",
      title: "Film Application",
      description:
        "The PVC decorative film is carefully applied as per customer demand, ensuring strong bonding and accuracy.",
      icon: <Layers className="w-6 h-6" />,
      image: "/lovable-uploads/5da71123-a8fa-4434-b635-e7459ed52958.png", // Step 2 image
    },
    {
      number: "03",
      title: "Embossing Process",
      description:
        "The door design is embossed using the latest technology machines, ensuring perfect details.",
      icon: <Stamp className="w-6 h-6" />,
      image: "/lovable-uploads/04d37422-1c78-46f5-b01d-c357288a66dd.png", // Step 3 image
    },
    {
      number: "04",
      title: "Framing",
      description:
        "The door frame includes PVC, M.S. pipe, and a rigid PVC sheet, cut to customer-specified sizes for a strong and durable structure.",
      icon: <LayoutGrid className="w-6 h-6" />,
      image: "/lovable-uploads/b16e8deb-56f8-4d41-ae28-556a876aff31.png", // Step 4 image
    },
    {
      number: "05",
      title: "Trimming",
      description:
        "After pressing, the doors undergo precise trimming and final touch-ups for a perfect finish.",
      icon: <Scissors className="w-6 h-6" />,
      image: "/lovable-uploads/049084c0-6b88-404a-b927-a76917427ca1.png", // Step 5 image
    },
    {
      number: "06",
      title: "Quality Inspection & Packaging",
      description:
        "Every door is thoroughly checked before packaging, ensuring top-tier quality and protection during delivery.",
      icon: <PackageCheck className="w-6 h-6" />,
      image: "/lovable-uploads/17784498-bca2-4a4d-9dad-afda6fbd7308.png", // Step 6 image
    },
  ];

  const materials = [
    {
      id: "pvc",
      title: "PVC Foam Board",
      description: "5mm thickness for door panels, 18mm width and 20mm thickness for framing",
      image: "/lovable-uploads/c9565cf2-322b-42b1-99bd-bbad8bfa8263.png"
    },
    {
      id: "film",
      title: "Decorative Film",
      description: "Premium 0.15mm PVC film available in 10 distinctive colors and finishes",
      image: "/lovable-uploads/75b2a0cb-8b53-4f2e-a82d-b10dded0e479.png"
    },
    {
      id: "structure",
      title: "Internal Structure",
      description: "20x20mm MS pipe framework with PVC rigid sheet fillers for strength and stability",
      image: "/lovable-uploads/8416ee93-b407-4d4d-a95a-e088714269cf.png"
    }
  ];

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
        <div className="flex justify-between items-center mb-8">
          <AnimateInView animation="fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
                Manufacturing Process
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
                How We Make <span className="text-gradient">Perfect Doors</span>
              </h2>
              <p className="text-foreground/80">
                Our meticulous manufacturing process ensures every door meets our stringent
                quality standards while delivering exceptional design and durability.
              </p>
            </div>
          </AnimateInView>
          
          <button 
            onClick={toggleEditMode}
            className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-md text-secondary hover:bg-secondary/20 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>Done Editing</span>
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                <span>Edit Images</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-20 md:space-y-24">
          {steps.map((step, index) => (
            <AnimateInView key={step.number} animation="fade-in" delay={index * 100}>
              <div className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
                index % 2 === 1 ? "md:grid-flow-dense" : ""
              )}>
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
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
                <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                  {isEditing ? (
                    <div className="relative">
                      <div className="mb-2 p-2 bg-gray-50 border rounded-md flex justify-end">
                        <select 
                          value={objectFitSettings[step.number] || "cover"}
                          onChange={(e) => handleObjectFitChange(step.number, e.target.value as any)}
                          className="text-xs px-2 py-1 rounded border"
                        >
                          <option value="contain">Contain</option>
                          <option value="cover">Cover</option>
                          <option value="fill">Fill</option>
                          <option value="scale-down">Scale Down</option>
                        </select>
                      </div>
                      <ImageSelector
                        value={localImages[step.number] || step.image}
                        onChange={(url) => handleImageChange(step.number, url)}
                        aspectRatio={4/3}
                        placeholder={`Select image for ${step.title}`}
                        objectFit={objectFitSettings[step.number] || "cover"}
                      />
                      <div className="absolute -bottom-4 -right-4 bg-background p-2 px-4 rounded-full shadow-lg border border-border/50 text-sm font-medium">
                        {step.title}
                      </div>
                    </div>
                  ) : (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 transform -rotate-3 rounded-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:rotate-0"></div>
                      <img
                        src={localImages[step.number] || step.image}
                        alt={`Step ${step.number}: ${step.title}`}
                        className={`relative rounded-lg w-full object-${objectFitSettings[step.number] || "cover"} shadow-lg border border-border/50 aspect-video md:aspect-[4/3] transition-all duration-300 group-hover:scale-[1.02]`}
                        loading="lazy"
                      />
                      <div className="absolute -bottom-4 -right-4 bg-background p-2 px-4 rounded-full shadow-lg border border-border/50 text-sm font-medium">
                        {step.title}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>

        <AnimateInView animation="fade-in" delay={300} className="mt-20">
          <div className="bg-secondary/20 rounded-2xl p-8 md:p-12 border border-border/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-3 text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-display font-bold">
                  Materials That Make the Difference
                </h3>
              </div>
              
              {materials.map((material, index) => (
                <AnimateInView
                  key={material.id}
                  animation="slide-in-up"
                  delay={index * 200}
                >
                  <div className="bg-background rounded-xl p-6 border border-border/50 h-full hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="mb-2 p-2 bg-gray-50 border rounded-md flex justify-end">
                          <select 
                            value={materialObjectFitSettings[material.id] || "cover"}
                            onChange={(e) => handleMaterialObjectFitChange(material.id, e.target.value as any)}
                            className="text-xs px-2 py-1 rounded border"
                          >
                            <option value="contain">Contain</option>
                            <option value="cover">Cover</option>
                            <option value="fill">Fill</option>
                            <option value="scale-down">Scale Down</option>
                          </select>
                        </div>
                        <ImageSelector
                          value={materialLocalImages[material.id] || material.image}
                          onChange={(url) => handleMaterialImageChange(material.id, url)}
                          aspectRatio={1}
                          placeholder={`Select image for ${material.title}`}
                          objectFit={materialObjectFitSettings[material.id] || "cover"}
                          maxHeight={100}
                        />
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium mb-2">Icon Image (Optional)</label>
                          <ImageSelector
                            value={materialIconImages[material.id]}
                            onChange={(url) => handleMaterialIconChange(material.id, url)}
                            aspectRatio={1}
                            placeholder={`Select icon for ${material.title}`}
                            objectFit="cover"
                            maxHeight={80}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                        {materialIconImages[material.id] ? (
                          <img 
                            src={materialIconImages[material.id]} 
                            alt={`${material.title} icon`}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : materialLocalImages[material.id] ? (
                          <img 
                            src={materialLocalImages[material.id]} 
                            alt={material.title}
                            className={`w-full h-full object-${materialObjectFitSettings[material.id] || "cover"} rounded-full`}
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
              ))}
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default Process;
