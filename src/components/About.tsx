
import React from "react";
import { cn } from "@/lib/utils";
import { AnimateInView, StaggerContainer } from "./ui/motion";

const About = () => {
  const features = [
    {
      letter: "Z",
      title: "Zero Compromise",
      description:
        "We never compromise on the quality of materials or manufacturing processes, ensuring every door meets our rigorous standards.",
    },
    {
      letter: "O",
      title: "Outstanding Design",
      description:
        "Our doors feature 17 unique embossing designs and 10 color options, providing endless possibilities for your interior spaces.",
    },
    {
      letter: "N",
      title: "Notable Quality",
      description:
        "From 5mm PVC foam board to 0.15mm decorative film, every component is selected for durability and aesthetic appeal.",
    },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container px-4 md:px-8 mx-auto">
        <AnimateInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
              The Meaning Behind <span className="text-gradient">Z-ON DOOR</span>
            </h2>
            <p className="text-foreground/80">
              Our name encapsulates our core values and the excellence we bring to every door we manufacture.
            </p>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimateInView
              key={feature.letter}
              animation="slide-in-up"
              delay={index * 200}
            >
              <div
                className={cn(
                  "rounded-xl p-8 h-full",
                  "border border-border/50 bg-background/50",
                  "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                  "flex flex-col"
                )}
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl font-bold text-primary">
                    {feature.letter}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/70 flex-grow">
                  {feature.description}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>

        <AnimateInView animation="fade-in" delay={600} className="mt-24">
          <div className="bg-secondary/10 rounded-2xl p-8 md:p-12 border border-border/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                  Precision-Crafted PVC Doors For Modern Interiors
                </h3>
                <p className="text-foreground/70 mb-6">
                  At Z-ON DOOR, we specialize in manufacturing premium PVC embossed doors 
                  using the latest technology and highest quality materials.
                </p>
                <ul className="space-y-3">
                  {[
                    "5mm PVC foam board with 0.15mm decorative film",
                    "Latest technology embossing machines",
                    "18mm width and 20mm thickness PVC foam board framing",
                    "Internal 20x20mm MS pipe structure for durability",
                    "PVC rigid sheet fillers for stability and longevity"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden bg-white shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1530334565651-210b1f73730f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Door Manufacturing Process"
                    className="w-full h-full object-cover aspect-video rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 glass-effect rounded-lg p-4 shadow-lg">
                  <p className="text-sm font-medium">Superior Materials</p>
                </div>
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default About;
