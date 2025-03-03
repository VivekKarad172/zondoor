
import React, { useState } from "react";
import { AnimateInView } from "../ui/motion";
import ProductTabs from "./ProductTabs";
import DesignsTab from "./DesignsTab";
import ColorsTab from "./ColorsTab";
import CncTab from "./CncTab";
import ProductActions from "./ProductActions";
import { designOptions, colorOptions, cncOptions } from "./ProductData";

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState("designs");

  return (
    <section id="products" className="section-padding bg-gray-50">
      <div className="wesmarc-container">
        <AnimateInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Products
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-secondary">
              Customize Your Perfect Door
            </h2>
            <p className="text-foreground/80">
              With 16 embossing designs, 6 foil color options, and custom CNC grooves,
              create a door that perfectly matches your interior style.
            </p>
          </div>
        </AnimateInView>

        {/* Product Tabs */}
        <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="bg-white rounded-md p-6 shadow-md border border-gray-100 mb-12">
          {activeTab === "designs" && <DesignsTab designs={designOptions} />}
          {activeTab === "colors" && <ColorsTab colors={colorOptions} />}
          {activeTab === "cnc" && <CncTab cncPatterns={cncOptions} />}
        </div>

        <ProductActions />
      </div>
    </section>
  );
};

export default ProductsSection;
