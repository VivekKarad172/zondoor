
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "./ui/motion";

const Products = () => {
  const [activeTab, setActiveTab] = useState("designs");

  // Sample data - in a real app, this would come from a backend
  const designOptions = [
    { id: 1, name: "Classic Panel", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Modern Groove", image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Lattice", image: "https://images.unsplash.com/photo-1534081333815-ae5019106622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Diagonal", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Minimalist", image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Geometric", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  ];

  const colorOptions = [
    { id: 1, name: "Snow White", color: "#FFFFFF" },
    { id: 2, name: "Charcoal Black", color: "#333333" },
    { id: 3, name: "Walnut", color: "#5E4B3C" },
    { id: 4, name: "Ash Grey", color: "#B2BEB5" },
    { id: 5, name: "Mahogany", color: "#C04000" },
    { id: 6, name: "Navy Blue", color: "#003366" },
  ];

  const cncOptions = [
    { id: 1, name: "Linear Pattern", image: "https://images.unsplash.com/photo-1629139695548-26de789ba1e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Circular Accent", image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Diamond Grid", image: "https://images.unsplash.com/photo-1616046619722-ebc3817069d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Wave Pattern", image: "https://images.unsplash.com/photo-1595815796144-ed6f757a9ad7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <section id="products" className="section-padding bg-secondary/30">
      <div className="container px-4 md:px-8 mx-auto">
        <AnimateInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              Our Products
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
              Customize Your Perfect <span className="text-gradient">Door</span>
            </h2>
            <p className="text-foreground/80">
              With 17 embossing designs, 10 foil color options, and custom CNC grooves,
              create a door that perfectly matches your interior style.
            </p>
          </div>
        </AnimateInView>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["designs", "colors", "cnc"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-3 rounded-full font-medium text-sm transition-all",
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-background hover:bg-background/80 border border-border"
                )}
              >
                {tab === "designs" && "Embossing Designs"}
                {tab === "colors" && "Foil Colors"}
                {tab === "cnc" && "CNC Grooves"}
              </button>
            ))}
          </div>

          <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50">
            {activeTab === "designs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {designOptions.map((design, index) => (
                  <AnimateInView
                    key={design.id}
                    animation="fade-in"
                    delay={index * 100}
                  >
                    <div className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group h-full">
                      <div className="relative overflow-hidden">
                        <img
                          src={design.image}
                          alt={design.name}
                          className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-sm font-medium">Design #{design.id}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2">{design.name}</h3>
                        <p className="text-foreground/70 text-sm">
                          Premium embossed pattern with precise detailing
                        </p>
                      </div>
                    </div>
                  </AnimateInView>
                ))}
              </div>
            )}

            {activeTab === "colors" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {colorOptions.map((color, index) => (
                  <AnimateInView
                    key={color.id}
                    animation="fade-in"
                    delay={index * 100}
                  >
                    <div className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 h-full">
                      <div
                        className="h-48 w-full"
                        style={{ backgroundColor: color.color }}
                      ></div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2">{color.name}</h3>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-6 w-6 rounded-full border border-border/50"
                            style={{ backgroundColor: color.color }}
                          ></div>
                          <p className="text-foreground/70 text-sm">
                            {color.color}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimateInView>
                ))}
              </div>
            )}

            {activeTab === "cnc" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {cncOptions.map((pattern, index) => (
                  <AnimateInView
                    key={pattern.id}
                    animation="fade-in"
                    delay={index * 100}
                  >
                    <div className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                      <div className="relative overflow-hidden flex-grow">
                        <img
                          src={pattern.image}
                          alt={pattern.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-sm font-medium">CNC Pattern #{pattern.id}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2">{pattern.name}</h3>
                        <p className="text-foreground/70 text-sm">
                          Precision CNC groove detailing for added sophistication
                        </p>
                      </div>
                    </div>
                  </AnimateInView>
                ))}
              </div>
            )}
          </div>
        </div>

        <AnimateInView animation="fade-in" delay={300}>
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
              Find Your Perfect Door Combination
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/90">
              With our extensive range of designs, colors, and patterns, you can create a door
              that perfectly complements your interior space.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg"
            >
              Request a Catalog
            </a>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default Products;
