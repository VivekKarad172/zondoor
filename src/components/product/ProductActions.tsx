
import React from "react";
import { AnimateInView } from "../ui/motion";
import { cn } from "@/lib/utils";

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
  );
};

export default ProductActions;
