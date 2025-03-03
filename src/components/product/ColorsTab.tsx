
import React from "react";
import { AnimateInView } from "../ui/motion";

interface ColorsTabProps {
  colors: {
    id: number;
    name: string;
    color: string;
    foil?: boolean;
    image?: string;
  }[];
}

const ColorsTab = ({ colors }: ColorsTabProps) => {
  // Separate colors into regular colors and foil colors
  const regularColors = colors.filter(color => !color.foil);
  const foilColors = colors.filter(color => color.foil);

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Standard Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularColors.map((color, index) => (
            <AnimateInView
              key={color.id}
              animation="fade-in"
              delay={index * 100}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div 
                  className="h-60 w-full relative" 
                  style={{ backgroundColor: color.color }}
                >
                  <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm p-3">
                    <p className="text-white font-medium text-sm">
                      Premium finish with high durability
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3">{color.name}</h3>
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-8 w-8 rounded-full border border-gray-200 shadow-sm" 
                      style={{ backgroundColor: color.color }}
                    ></div>
                    <p className="text-gray-700 font-medium">
                      {color.color}
                    </p>
                  </div>
                  <p className="mt-4 text-gray-600 text-sm">
                    Z-ON premium finish with advanced UV protection
                  </p>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>

      {foilColors.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Premium Foil Finishes</h3>
          <p className="text-gray-600">Wood-textured foil finishes provide an elegant look with the durability of PVC</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foilColors.map((color, index) => (
              <AnimateInView
                key={color.id}
                animation="fade-in"
                delay={index * 100}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  {color.image ? (
                    <div className="h-60 w-full relative overflow-hidden">
                      <img 
                        src={color.image} 
                        alt={`${color.name} foil finish`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm p-3">
                        <p className="text-white font-medium text-sm">
                          Premium wood-textured foil finish
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="h-60 w-full relative" 
                      style={{ backgroundColor: color.color }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm p-3">
                        <p className="text-white font-medium text-sm">
                          Premium foil finish
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-3">{color.name} Foil</h3>
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-8 w-8 rounded-full border border-gray-200 shadow-sm" 
                        style={{ backgroundColor: color.color }}
                      ></div>
                      <p className="text-gray-700 font-medium">
                        Premium Foil Finish
                      </p>
                    </div>
                    <p className="mt-4 text-gray-600 text-sm">
                      Z-ON premium foil finish with wood-like texture and advanced UV protection
                    </p>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorsTab;
