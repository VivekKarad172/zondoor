
import React from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "./ui/motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30 -z-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDBoLTZ2MzBoNlYzMHoiLz48cGF0aCBkPSJNMzAgMzZWMEgwdjZoMjR2MjRoNnYtNnptMCAwVjYwaDMwdi02SDM2VjMwaC02eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat opacity-5 -z-10"></div>

      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <AnimateInView animation="fade-in" delay={300}>
              <span className="bg-primary/5 border border-primary/10 text-foreground/80 text-xs tracking-wider uppercase font-semibold px-3 py-1 rounded-full inline-block mb-6">
                Premium PVC Embossed Doors
              </span>
            </AnimateInView>

            <AnimateInView animation="slide-in-up" delay={400}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                <span className="text-gradient">Zero Compromise</span> on
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
                    "bg-transparent border border-primary/20 text-foreground",
                    "hover:bg-primary/5 px-6 py-3 rounded-md font-medium inline-flex items-center",
                    "transition-all duration-300"
                  )}
                >
                  Our Process
                </a>
              </div>
            </AnimateInView>
          </div>

          <div className="order-1 md:order-2 relative">
            <AnimateInView animation="fade-in" delay={200}>
              <div className="relative">
                {/* Door image with reflection and shadow effect */}
                <div className="rounded-lg overflow-hidden bg-gradient-to-b from-accent to-secondary transform hover:scale-[1.02] transition-all duration-500 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Z-on Door Premium PVC Door"
                    className="w-full object-cover aspect-[3/4] rounded-lg"
                    loading="lazy"
                  />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -bottom-6 -left-6 glass-effect rounded-lg p-4 shadow-lg max-w-[160px]">
                  <p className="text-xs font-medium mb-1">Available in</p>
                  <p className="text-xl font-bold">17 Designs</p>
                </div>
                
                <div className="absolute -top-6 -right-6 glass-effect rounded-lg p-4 shadow-lg max-w-[160px]">
                  <p className="text-xs font-medium mb-1">Choose from</p>
                  <p className="text-xl font-bold">10 Colors</p>
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
