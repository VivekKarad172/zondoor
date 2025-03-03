
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "./ui/motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

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

  const specifications = [
    "5mm PVC foam board with 0.15mm decorative film",
    "Latest technology embossing machines",
    "18mm width and 20mm thickness PVC foam board framing",
    "Internal 20×20mm MS pipe structure for durability",
    "PVC rigid sheet fillers for stability and longevity"
  ];

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === doorImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? doorImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // Auto-rotate images every 5 seconds
    const interval = setInterval(() => {
      goToNextSlide();
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
      className="relative h-screen w-full flex items-center justify-center bg-gray-50 overflow-hidden"
    >
      {/* Full-screen slideshow background */}
      <div className="absolute inset-0 w-full h-full">
        {doorImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-black/50 bg-gradient-to-r from-black/70 to-transparent"></div>
          </div>
        ))}

        {/* Slideshow navigation arrows */}
        <button 
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Content overlay */}
      <div className="wesmarc-container relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <AnimateInView animation="fade-in" delay={300}>
            <span className="bg-primary/20 text-white text-xs tracking-wider uppercase font-semibold px-3 py-1 rounded-full inline-block mb-6">
              Quality PVC Embossed Doors
            </span>
          </AnimateInView>

          <AnimateInView animation="slide-in-up" delay={400}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              Premium PVC <span className="text-primary-foreground">Doors</span> <br />For Modern Interiors
            </h1>
          </AnimateInView>

          <AnimateInView animation="slide-in-up" delay={600}>
            <p className="text-white/90 text-lg mb-8 max-w-lg">
              At Z-ON DOOR, we specialize in manufacturing premium PVC embossed 
              doors using the latest technology and highest quality materials.
            </p>
          </AnimateInView>

          <AnimateInView animation="slide-in-up" delay={700}>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Superior Materials</h3>
              <ul className="space-y-3">
                {specifications.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary-foreground mr-2 mt-1 flex-shrink-0" />
                    <span className="text-white/90">{spec}</span>
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
                  "px-6 py-3 rounded-md font-medium inline-flex items-center",
                  "transition-all duration-300 transform hover:translate-y-[-2px]",
                  "shadow-md"
                )}
              >
                Explore Products
              </a>
              <a
                href="/ZON DOOR CATALOG.pdf"
                download
                className={cn(
                  "bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20",
                  "px-6 py-3 rounded-md font-medium inline-flex items-center",
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

        {/* Slideshow indicator dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {doorImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
