
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimateInView } from "@/components/ui/motion";
import ProductsSection from "@/components/product/ProductsSection";
import LoadingScreen from "@/components/LoadingScreen";
import { Helmet } from "react-helmet";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Update document title
    document.title = "Z-on Door | Best 3D PVC Doors Manufacturer in India";
    
    // Create image objects to preload
    const preloadImages = [
      "/lovable-uploads/dbff8393-7a6e-4aa3-a4aa-a985f7a0c5f6.png",
      "/lovable-uploads/e7524959-84c6-4617-999c-5b8e0e5e2f7b.png",
      "/lovable-uploads/b3e205a9-276d-4260-ad24-c55cd2df0659.png",
      "/lovable-uploads/d6ecdb63-a48c-4023-9661-21a657af870e.png",
      "/lovable-uploads/ac445c52-9c9c-4a4b-bb03-dba4483c9fd1.png",
      "/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png" // Logo
    ];
    
    // Track how many images have loaded
    let loadedCount = 0;
    const totalImages = preloadImages.length;
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          // All critical images loaded, allow a small timeout to ensure UI readiness
          setTimeout(() => setIsLoading(false), 800);
        }
      };
      img.onerror = () => {
        loadedCount++;
        console.error(`Failed to preload image: ${src}`);
        if (loadedCount === totalImages) {
          setTimeout(() => setIsLoading(false), 800);
        }
      };
      img.src = src;
    });
    
    // Fallback in case images take too long
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Max 3 seconds of loading
    
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <LoadingScreen onFinishLoading={() => setIsLoading(false)} duration={2000} />;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Helmet>
        <title>Z-on Door | Best 3D PVC Doors Manufacturer in India</title>
        <meta name="description" content="Discover premium-quality 3D PVC doors for bathrooms, balconies, and bedrooms. Z-on Door offers durable and stylish WPC and PVC screen doors in Surat, Gujarat." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Z-on Door",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Surat",
                "addressRegion": "Gujarat",
                "addressCountry": "India"
              },
              "description": "Manufacturer of premium 3D PVC Doors, WPC Doors, and PVC Screens",
              "url": "https://www.zondoor.com",
              "telephone": "+919601748998",
              "openingHours": "Mo-Sa 09:00-18:00",
              "priceRange": "₹₹₹",
              "image": "/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png",
              "sameAs": [
                "https://www.facebook.com/zondoor",
                "https://www.instagram.com/zondoor"
              ]
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <Hero />
      <About />
      <ProductsSection />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateInView animation="fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-secondary">Get in Touch</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Have questions or need more information? Visit our contact page for details or to send us a message.
              </p>
              <Link to="/contact">
                <Button variant="default" size="lg" className="rounded-full px-8">
                  Contact Us
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
