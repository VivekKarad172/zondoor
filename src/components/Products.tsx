
import React, { useState } from "react";
import { AnimateInView } from "./ui/motion";
import DesignsTab from "./product/DesignsTab";
import ColorsTab from "./product/ColorsTab";
import CncTab from "./product/CncTab";
import CategoryDropdown from "./product/CategoryDropdown";
import ProductTabs from "./product/ProductTabs";
import { designOptions, colorOptions, cncOptions, categories, websiteInfo } from "./product/ProductData";
import { cn } from "@/lib/utils";

const Products = () => {
  const [activeTab, setActiveTab] = useState("designs");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleVisitMainWebsite = () => {
    window.open(websiteInfo.mainWebsite, '_blank');
  };

  return (
    <section id="products" className="section-padding bg-secondary/30">
      <div className="container px-4 md:px-8 mx-auto">
        <AnimateInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              Our Products
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
              Customize Your Perfect <span className="text-gradient">Door</span>
            </h2>
            <p className="text-foreground/80">
              With 16 embossing designs, 6 foil color options, and custom CNC grooves,
              create a door that perfectly matches your interior style.
            </p>
            <div className="mt-6">
              <a
                href="/ZON DOOR CATALOG.pdf"
                download
                className={cn(
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                  "px-6 py-3 rounded-md font-medium inline-flex items-center",
                  "transition-all duration-300 transform hover:translate-y-[-2px]",
                  "shadow-lg shadow-primary/20 mx-auto"
                )}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path 
                    d="M12 15V3M12 15L8 11M12 15L16 11M3 15V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V15" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Download Our Complete Catalog
              </a>
            </div>
          </div>
        </AnimateInView>

        {/* Category Dropdown */}
        <CategoryDropdown 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryMenuOpen={categoryMenuOpen}
          setCategoryMenuOpen={setCategoryMenuOpen}
        />

        <div className="mb-12">
          {/* Product Tabs */}
          <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50">
            {activeTab === "designs" && <DesignsTab designs={designOptions} />}
            {activeTab === "colors" && <ColorsTab colors={colorOptions} />}
            {activeTab === "cnc" && <CncTab cncPatterns={cncOptions} />}
          </div>
        </div>

        <AnimateInView animation="fade-in" delay={300}>
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
              Find Your Perfect Door Combination
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/90">
              With our extensive range of designs, colors, and patterns, you can create a door
              that perfectly complements your interior space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg"
              >
                Request a Catalog
              </a>
              <button
                onClick={handleVisitMainWebsite}
                className="inline-flex items-center justify-center bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:translate-y-[-2px] border border-primary-foreground/40"
              >
                Visit Our Main Website
              </button>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default Products;
