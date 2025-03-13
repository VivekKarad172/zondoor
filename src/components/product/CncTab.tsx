
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ImageModal from "../ui/image-modal";

interface CncTabProps {
  cncPatterns: {
    id: number;
    name: string;
    image: string;
  }[];
  isEditable?: boolean;
  onImageChange?: (id: number, newImage: string) => void;
}

const CncTab = ({ cncPatterns, isEditable = false, onImageChange }: CncTabProps) => {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);

  const openImageModal = (imageSrc: string, imageAlt: string) => {
    setSelectedImage({
      src: imageSrc,
      alt: imageAlt
    });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleImageChange = (id: number, newImage: string) => {
    if (onImageChange) {
      onImageChange(id, newImage);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {cncPatterns.map((pattern, index) => (
        <ProductCard
          key={pattern.id}
          id={pattern.id}
          name={pattern.name}
          image={pattern.image}
          index={index}
          type="cnc"
          onImageClick={(image, name) => openImageModal(image, name)}
          isEditable={isEditable}
          onImageChange={handleImageChange}
        />
      ))}

      {/* Image Modal for Zoom Functionality */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeImageModal}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          imageDescription="Precision CNC groove detailing for added sophistication"
        />
      )}
    </div>
  );
};

export default CncTab;
