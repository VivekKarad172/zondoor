
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Z-ON DOOR | Premium PVC Embossed Doors";
    
    // Preload hero images for better performance - reduced to core images
    const preloadImages = [
      "/lovable-uploads/dbff8393-7a6e-4aa3-a4aa-a985f7a0c5f6.png",
      "/lovable-uploads/e7524959-84c6-4617-999c-5b8e0e5e2f7b.png",
      "/lovable-uploads/b3e205a9-276d-4260-ad24-c55cd2df0659.png",
      "/lovable-uploads/d6ecdb63-a48c-4023-9661-21a657af870e.png",
      "/lovable-uploads/ac445c52-9c9c-4a4b-bb03-dba4483c9fd1.png",
      "/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png" // Logo
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <Hero />
      <About />
      <Products />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
