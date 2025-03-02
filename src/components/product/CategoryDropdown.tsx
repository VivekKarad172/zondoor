
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { AnimateInView } from "../ui/motion";

interface Category {
  id: string;
  name: string;
}

interface CategoryDropdownProps {
  categories: Category[];
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  categoryMenuOpen: boolean;
  setCategoryMenuOpen: (open: boolean) => void;
}

const CategoryDropdown = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  categoryMenuOpen,
  setCategoryMenuOpen
}: CategoryDropdownProps) => {
  const categoryRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCategoryMenuOpen]);

  const toggleCategoryMenu = () => {
    setCategoryMenuOpen(!categoryMenuOpen);
  };

  const selectCategory = (category: Category) => {
    setSelectedCategory(category);
    setCategoryMenuOpen(false);
  };

  return (
    <div className="mb-8">
      <AnimateInView animation="fade-in" delay={200}>
        <div className="relative w-full md:w-64 mx-auto" ref={categoryRef}>
          <button
            onClick={toggleCategoryMenu}
            className="w-full bg-background border border-border flex items-center justify-between px-4 py-3 rounded-lg shadow-sm hover:bg-background/80 transition-colors"
          >
            <span className="font-medium">{selectedCategory.name}</span>
            <ChevronDown 
              className={cn(
                "h-5 w-5 text-foreground/70 transition-transform duration-200",
                categoryMenuOpen ? "transform rotate-180" : ""
              )} 
            />
          </button>
          
          {categoryMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-full z-20 bg-background rounded-lg shadow-lg border border-border py-1 animate-in fade-in-80 zoom-in-95">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => selectCategory(category)}
                  className={cn(
                    "w-full text-left px-4 py-2 hover:bg-secondary/50 transition-colors",
                    selectedCategory.id === category.id ? "bg-secondary/30 font-medium" : ""
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </AnimateInView>
    </div>
  );
};

export default CategoryDropdown;
