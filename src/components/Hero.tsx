
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "./ui/motion";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const doorImages = [
    {
      src: "/lovable-uploads/46ac2b5d-eb4d-4dc9-b393-c9c07e5bc7bd.png",
      alt: "Z-on Door Premium PVC Doors Collection"
    },
    {
      src: "/lovable-uploads/96ec7b24-2d86-4ee9-abcd-65c8a4a06688.png",
      alt: "Premium 4-Panel PVC Door with Teak Wood Finish"
    },
    {
      src: "/lovable-uploads/3b5e4d4d-acf4-49b8-ab34-0791c5eccd08.png",
      alt: "Elegant 2-Panel PVC Door for Bathroom"
    },
    {
      src: "/lovable-uploads/18f66662-026a-4604-8344-362314f10cca.png",
      alt: "Modern Panel PVC Door for Bathroom"
    },
    {
      src: "/lovable-uploads/e0be35b1-01f1-4b46-9985-a1f2c27a00aa.png",
      alt: "Classic Arch-Design PVC Door"
    }
  ];

  useEffect(() => {
    // Auto-rotate images every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === doorImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    // Preload all images for smoother transitions
    doorImages.forEach(image => {
      const img = new Image();
      img.src = image.src;
    });
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5 -z-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDBoLTZ2MzBoNlYzMHoiLz48cGF0aCBkPSJNMzAgMzZWMEgwdjZoMjR2MjRoNnYtNnptMCAwVjYwaDMwdi02SDM2VjMwaC02eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat opacity-5 -z-10"></div>

      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <AnimateInView animation="fade-in" delay={300}>
              <span className="bg-primary/10 border border-primary/20 text-foreground/80 text-xs tracking-wider uppercase font-semibold px-3 py-1 rounded-full inline-block mb-6">
                Premium PVC Embossed Doors
              </span>
            </AnimateInView>

            <AnimateInView animation="slide-in-up" delay={400}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                <span className="text-primary">Zero Compromise</span> on
                <br />
                Design & Quality
              </h1>
            </AnimateInView>

            <AnimateInView animation="slide-in-up" delay={600}>
              <p className="text-foreground/80 text-lg mb-8 max-w-lg">
                Elevate your spaces with our precision-crafted PVC embossed doors, 
                featuring outstanding designs and notable quality for modern interiors.
              </p>
            </AnimateInView>

            <AnimateInView animation="slide-in-up" delay={800}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#products"
                  className={cn(
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    "px-6 py-3 rounded-md font-medium inline-flex items-center",
                    "transition-all duration-300 transform hover:translate-y-[-2px]",
                    "shadow-lg shadow-primary/20"
                  )}
                >
                  Explore Products
                </a>
                <a
                  href="#process"
                  className={cn(
                    "bg-transparent border border-secondary/20 text-secondary",
                    "hover:bg-secondary/5 px-6 py-3 rounded-md font-medium inline-flex items-center",
                    "transition-all duration-300"
                  )}
                >
                  Our Process
                </a>
                <a
                  href="/ZON DOOR CATALOG.pdf"
                  download
                  className={cn(
                    "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                    "px-6 py-3 rounded-md font-medium inline-flex items-center",
                    "transition-all duration-300 transform hover:translate-y-[-2px]",
                    "shadow-lg shadow-secondary/20"
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
                  Download Our Catalog
                </a>
              </div>
            </AnimateInView>
          </div>

          <div className="order-1 md:order-2 relative">
            <AnimateInView animation="fade-in" delay={200}>
              <div className="relative">
                {/* Image carousel with fade transition */}
                <div className="relative h-[500px] md:h-[600px] w-full rounded-lg overflow-hidden">
                  {doorImages.map((image, index) => (
                    <div 
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <div className="h-full w-full rounded-lg overflow-hidden bg-gradient-to-b from-accent/50 to-primary/5 transform hover:scale-[1.02] transition-all duration-500 shadow-xl border border-primary/10">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover rounded-lg"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Image navigation dots */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {doorImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-primary scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Floating badges */}
                <div className="absolute -bottom-6 -left-6 glass-effect rounded-lg p-4 shadow-lg max-w-[160px] border-l-4 border-primary">
                  <p className="text-xs font-medium mb-1">Featured Models</p>
                  <p className="text-xl font-bold">ZN Series</p>
                </div>
                
                <div className="absolute -top-6 -right-6 glass-effect rounded-lg p-4 shadow-lg max-w-[160px] border-r-4 border-secondary">
                  <p className="text-xs font-medium mb-1">Premium</p>
                  <p className="text-xl font-bold">Teak Finish</p>
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
