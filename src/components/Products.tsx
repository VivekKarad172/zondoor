
import React, { useState } from "react";
import { AnimateInView } from "./ui/motion";
import DesignsTab from "./product/DesignsTab";
import ColorsTab from "./product/ColorsTab";
import CncTab from "./product/CncTab";
import CategoryDropdown from "./product/CategoryDropdown";
import ProductTabs from "./product/ProductTabs";
import { designOptions, colorOptions, cncOptions, categories, websiteInfo } from "./product/ProductData";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Products = () => {
  const [activeTab, setActiveTab] = useState("designs");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleVisitMainWebsite = () => {
    window.open(websiteInfo.mainWebsite, '_blank');
  };

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

        <AnimateInView animation="fade-in" delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-md shadow-md border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-secondary">Download Our Catalog</h3>
              <p className="text-foreground/80 mb-6">
                Get our complete catalog with all door designs, color options, and technical specifications.
              </p>
              <a
                href="/ZON DOOR CATALOG.pdf"
                download
                className={cn(
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                  "px-6 py-3 rounded-md font-medium inline-flex items-center",
                  "transition-all duration-300"
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
                Download Catalog
              </a>
            </div>
            
            <div className="bg-primary text-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-bold mb-4">Request a Quote</h3>
              <p className="text-white/90 mb-6">
                Interested in our doors? Fill out our contact form and we'll get back to you with pricing information.
              </p>
              <a
                href="#contact"
                className={cn(
                  "bg-white text-primary hover:bg-gray-100",
                  "px-6 py-3 rounded-md font-medium inline-flex items-center",
                  "transition-all duration-300"
                )}
              >
                Contact Us
              </a>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default Products;
