
import React from "react";
import ProductCard from "./ProductCard";

interface DesignsTabProps {
  designs: {
    id: number;
    name: string;
    image: string;
  }[];
}

const DesignsTab = ({ designs }: DesignsTabProps) => {
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
        />
      ))}
    </div>
  );
};

export default DesignsTab;
