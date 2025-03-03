
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ImageModal from "../ui/image-modal";

interface DesignsTabProps {
  designs: {
    id: number;
    name: string;
    image: string;
  }[];
}

const DesignsTab = ({ designs }: DesignsTabProps) => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {designs.map((design, index) => (
        <ProductCard
          key={design.id}
          id={design.id}
          name={design.name}
          image={design.image}
          index={index}
          type="design"
          onImageClick={(image, name) => openImageModal(image, name)}
        />
      ))}

      {/* Image Modal for Zoom Functionality */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeImageModal}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          imageDescription="Premium embossed pattern with precise detailing"
        />
      )}
    </div>
  );
};

export default DesignsTab;
