
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
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimateInView } from "@/components/ui/motion";

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
      
      {/* Location Section with Link to Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateInView animation="fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-secondary">Find Us</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Visit our manufacturing facility and showroom to see our premium PVC doors in person.
              </p>
              <Link to="/location">
                <Button variant="default" size="lg" className="rounded-full px-8">
                  View Our Location
                </Button>
              </Link>
            </div>
          </AnimateInView>
        </div>
      </section>
      
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
