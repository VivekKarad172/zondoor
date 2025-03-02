
import React from "react";
import ProductCard from "./ProductCard";

interface CncTabProps {
  cncPatterns: {
    id: number;
    name: string;
    image: string;
  }[];
}

const CncTab = ({ cncPatterns }: CncTabProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {cncPatterns.map((pattern, index) => (
        <ProductCard
          key={pattern.id}
          id={pattern.id}
          name={pattern.name}
          image={pattern.image}
          index={index}
          type="cnc"
        />
      ))}
    </div>
  );
};

export default CncTab;
