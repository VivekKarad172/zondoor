
import React from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "./ui/motion";

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Material Selection",
      description:
        "We start with premium 5mm PVC foam board and select the highest quality 0.15mm PVC decorative film for your chosen color and finish.",
      image: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "02",
      title: "Film Application",
      description:
        "Using our latest technology machines, we precisely apply the decorative film to the PVC foam board, ensuring a perfect, bubble-free finish.",
      image: "https://images.unsplash.com/photo-1584213905697-cbb47a3ea0ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "03",
      title: "Embossing Process",
      description:
        "Your selected design from our catalog of 17 options is embossed into the material, creating a distinctive and tactile pattern.",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "04",
      title: "CNC Detailing",
      description:
        "Optional CNC grooves can be added to enhance the door's design, with 10 custom patterns available to complement the embossed pattern.",
      image: "https://images.unsplash.com/photo-1505798577933-1c0eb82e0ea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "05",
      title: "Frame Assembly",
      description:
        "The door is framed with 18mm width and 20mm thick PVC foam board, reinforced with 20x20mm MS pipe for structural integrity.",
      image: "https://images.unsplash.com/photo-1587162146766-e06b1189b907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "06",
      title: "Quality Inspection",
      description:
        "Each door undergoes rigorous quality testing to ensure it meets our zero-compromise standards before being prepared for delivery.",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="process" className="section-padding bg-background">
      <div className="container px-4 md:px-8 mx-auto">
        <AnimateInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              Manufacturing Process
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
              How We Craft <span className="text-gradient">Perfect Doors</span>
            </h2>
            <p className="text-foreground/80">
              Our meticulous manufacturing process ensures every door meets our stringent
              quality standards while delivering exceptional design and durability.
            </p>
          </div>
        </AnimateInView>

        <div className="space-y-20 md:space-y-32">
          {steps.map((step, index) => (
            <AnimateInView key={step.number} animation="fade-in" delay={index * 100}>
              <div className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
                index % 2 === 1 ? "md:grid-flow-dense" : ""
              )}>
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <div className="space-y-6">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary font-bold text-xl">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="pt-2">
                      <div className="h-1 w-20 bg-primary/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 transform -rotate-3 rounded-lg"></div>
                    <img
                      src={step.image}
                      alt={step.title}
                      className="relative rounded-lg w-full object-cover shadow-lg border border-border/50 aspect-video md:aspect-[4/3]"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-background p-2 px-4 rounded-full shadow-lg border border-border/50 text-sm font-medium">
                      Step {step.number}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>

        <AnimateInView animation="fade-in" delay={300} className="mt-20">
          <div className="bg-secondary/50 rounded-2xl p-8 md:p-12 border border-border/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-3 text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-display font-bold">
                  Materials That Make the Difference
                </h3>
              </div>
              
              {[
                {
                  title: "PVC Foam Board",
                  description: "5mm thickness for door panels, 18mm width and 20mm thickness for framing",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  title: "Decorative Film",
                  description: "Premium 0.15mm PVC film available in 10 distinctive colors and finishes",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 7H20V17H4V7Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 7V17" stroke="currentColor" strokeWidth="2"/>
                      <path d="M17 7V17" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  title: "Internal Structure",
                  description: "20x20mm MS pipe framework with PVC rigid sheet fillers for strength and stability",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3V21M21 3V21M3 12H21" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                }
              ].map((material, index) => (
                <AnimateInView
                  key={index}
                  animation="slide-in-up"
                  delay={index * 200}
                >
                  <div className="bg-background rounded-xl p-6 border border-border/50 h-full">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      {material.icon}
                    </div>
                    <h4 className="text-lg font-bold mb-2">{material.title}</h4>
                    <p className="text-foreground/70 text-sm">
                      {material.description}
                    </p>
                  </div>
                </AnimateInView>
              ))}
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default Process;
