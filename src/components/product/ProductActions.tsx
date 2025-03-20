
import React from "react";
import { AnimateInView } from "../ui/motion";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

const ProductActions = () => {
  return (
    <AnimateInView animation="fade-in" delay={300}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-6 rounded-md shadow-md border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-secondary">Download Our Catalog</h3>
          <p className="text-foreground/80 mb-6">
            Get our complete catalog with all door designs, color options, and technical specifications.
          </p>
          <a
            href="https://drive.google.com/file/d/1lCoKIPFn63So99eKhnYt8w49DXo9_UAa/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "px-6 py-3 rounded-md font-medium inline-flex items-center",
              "transition-all duration-300"
            )}
          >
            <Download size={20} className="mr-2" />
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
  );
};

export default ProductActions;
