
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import BackgroundDoors from "@/components/BackgroundDoors";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Z-ON DOOR | Premium PVC Embossed Doors";
    
    // Preload hero images for better performance
    const preloadImages = [
      "/lovable-uploads/46ac2b5d-eb4d-4dc9-b393-c9c07e5bc7bd.png",
      "/lovable-uploads/96ec7b24-2d86-4ee9-abcd-65c8a4a06688.png",
      "/lovable-uploads/3b5e4d4d-acf4-49b8-ab34-0791c5eccd08.png"
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundDoors />
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Process />
      <Gallery />
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
