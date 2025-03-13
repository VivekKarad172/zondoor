
import React from "react";
import { Check } from "lucide-react";
import { AnimateInView } from "../ui/motion";
import { cn } from "@/lib/utils";

interface HeroContentProps {
  specifications: string[];
  catalogPdfUrl?: string;
}

const HeroContent = ({ specifications, catalogPdfUrl = "/ZON DOOR CATALOG.pdf" }: HeroContentProps) => {
  return (
    <div className="lg:col-span-6 lg:col-start-1 lg:pr-8 max-w-2xl">
      <AnimateInView animation="fade-in" delay={300}>
        <span className="bg-primary/20 text-white text-xs tracking-wider uppercase font-semibold px-3 py-1 rounded-full inline-block mb-4">
          Quality PVC Embossed Doors
        </span>
      </AnimateInView>

      <AnimateInView animation="slide-in-up" delay={400}>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-white drop-shadow-md">
          Premium PVC <span className="text-primary-foreground">Doors</span> <br />For Modern Interiors
        </h1>
      </AnimateInView>

      <AnimateInView animation="slide-in-up" delay={600}>
        <p className="text-white text-base mb-6 max-w-md drop-shadow-md">
          At Z-ON DOOR, we specialize in manufacturing premium PVC embossed 
          doors using the latest technology and highest quality materials.
        </p>
      </AnimateInView>

      <AnimateInView animation="slide-in-up" delay={700}>
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20 mb-6 max-w-md">
          <h3 className="text-lg font-semibold mb-2 text-white">Superior Materials</h3>
          <ul className="space-y-2">
            {specifications.map((spec, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-4 w-4 text-primary-foreground mr-2 mt-1 flex-shrink-0" />
                <span className="text-white text-sm">{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </AnimateInView>

      <AnimateInView animation="slide-in-up" delay={800}>
        <div className="flex flex-wrap gap-4">
          <a
            href="#products"
            className={cn(
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "px-5 py-2.5 rounded-md font-medium inline-flex items-center",
              "transition-all duration-300 transform hover:translate-y-[-2px]",
              "shadow-md"
            )}
          >
            Explore Products
          </a>
          <a
            href={catalogPdfUrl}
            download
            className={cn(
              "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30",
              "px-5 py-2.5 rounded-md font-medium inline-flex items-center",
              "transition-all duration-300 transform hover:translate-y-[-2px]",
              "shadow-sm"
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
      </AnimateInView>
    </div>
  );
};

export default HeroContent;
