
import React from "react";
import ProductCard from "./ProductCard";
import { AnimateInView } from "../ui/motion";

interface ColorsTabProps {
  colors: {
    id: number;
    name: string;
    color: string;
  }[];
}

const ColorsTab = ({ colors }: ColorsTabProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {colors.map((color, index) => (
        <ProductCard
          key={color.id}
          id={color.id}
          name={color.name}
          color={color.color}
          index={index}
          type="color"
        />
      ))}
    </div>
  );
};

export default ColorsTab;
