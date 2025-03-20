import React, { useState, useEffect } from "react";
import { AnimateInView } from "./ui/motion";
import { cn } from "@/lib/utils";
import { doorCategories, doorGalleryItems } from "./product/GalleryData";
import ImageModal from "./ui/image-modal";
import { Download } from "lucide-react";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState(doorGalleryItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    src: "",
    alt: "",
    description: ""
  });

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredItems(doorGalleryItems);
    } else {
      setFilteredItems(
        doorGalleryItems.filter(item => 
          item.category.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory]);

  const openModal = (image: string, alt: string, description: string) => {
    setSelectedImage({ src: image, alt, description });
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="gallery" className="section-padding bg-secondary/10">
      <div className="container px-4 md:px-8 mx-auto">
        <AnimateInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              Our Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
              Explore Our <span className="text-gradient">Door Gallery</span>
            </h2>
            <p className="text-foreground/80">
              Browse through our extensive collection of premium doors designed for various spaces
              and preferences. Click on any image for a closer look.
            </p>
          </div>
        </AnimateInView>

        {/* Category Filter */}
        <div className="mb-10">
          <AnimateInView animation="fade-in" delay={300}>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {doorCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-md transition-all duration-300",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-background text-foreground hover:bg-primary/10"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </AnimateInView>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <AnimateInView 
              key={item.id} 
              animation="fade-in" 
              delay={index * 100}
              className="h-full"
            >
              <div className="bg-background border border-border/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden cursor-pointer group" 
                  onClick={() => openModal(item.image, item.name, item.description)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-primary"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                        <path d="M11 8v6" />
                        <path d="M8 11h6" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-foreground/70 text-sm flex-1">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.category.map((cat) => {
                      const categoryName = doorCategories.find(c => c.id === cat)?.name || cat;
                      return (
                        <span key={cat} className="inline-block bg-muted px-2 py-1 rounded-md text-xs font-medium">
                          {categoryName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>

        {/* Call to Action */}
        <AnimateInView animation="fade-in" delay={600} className="mt-16">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
              Find Your Perfect Door Today
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/90">
              Our extensive catalog features many more designs, colors, and customization options. 
              Download our catalog or contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://drive.google.com/file/d/1lCoKIPFn63So99eKhnYt8w49DXo9_UAa/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg"
              >
                <Download size={20} className="mr-2" />
                Download Full Catalog
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:translate-y-[-2px] border border-primary-foreground/40"
              >
                Contact For Custom Designs
              </a>
            </div>
          </div>
        </AnimateInView>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={selectedImage.src}
        imageAlt={selectedImage.alt}
        imageDescription={selectedImage.description}
      />
    </section>
  );
};

export default Gallery;
