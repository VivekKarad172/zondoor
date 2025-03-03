
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
        <AnimateInView
          key={color.id}
          animation="fade-in"
          delay={index * 100}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="h-60 w-full" 
              style={{ backgroundColor: color.color }}
            ></div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-3">{color.name}</h3>
              <div className="flex items-center gap-3">
                <div 
                  className="h-6 w-6 rounded-full border border-gray-200 shadow-sm" 
                  style={{ backgroundColor: color.color }}
                ></div>
                <p className="text-gray-600">
                  {color.color}
                </p>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                Premium foil finish with high durability
              </p>
            </div>
          </div>
        </AnimateInView>
      ))}
    </div>
  );
};

export default ColorsTab;
