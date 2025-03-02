
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
    
    // Preload the hero image for better performance
    const preloadImage = new Image();
    preloadImage.src = "/lovable-uploads/46ac2b5d-eb4d-4dc9-b393-c9c07e5bc7bd.png";
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
