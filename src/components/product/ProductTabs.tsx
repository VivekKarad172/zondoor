
import React from "react";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProductTabs = ({ activeTab, setActiveTab }: ProductTabsProps) => {
  const tabs = [
    { id: "designs", label: "Door Designs" },
    { id: "colors", label: "Color Options" },
    { id: "cnc", label: "CNC Patterns" }
  ];

  return (
    <div className="flex flex-wrap border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "px-4 py-2 font-medium text-sm transition-all border-b-2 mr-2",
            activeTab === tab.id
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProductTabs;
