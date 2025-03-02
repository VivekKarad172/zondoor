
import React from "react";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProductTabs = ({ activeTab, setActiveTab }: ProductTabsProps) => {
  const tabs = [
    { id: "designs", label: "Embossing Designs" },
    { id: "colors", label: "Foil Colors" },
    { id: "cnc", label: "CNC Grooves" }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "px-6 py-3 rounded-full font-medium text-sm transition-all",
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-background hover:bg-background/80 border border-border"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProductTabs;
