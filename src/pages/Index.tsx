
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
import { Download } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Update document title
    document.title = "Z-on Door | Best 3D PVC Doors Manufacturer in India";
    
    // Only preload the critical images
    const preloadImages = [
      "/lovable-uploads/c9565cf2-322b-42b1-99bd-bbad8bfa8263.png", // First hero image
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
          setTimeout(() => setIsLoading(false), 500);
        }
      };
      img.onerror = () => {
        loadedCount++;
        console.error(`Failed to preload image: ${src}`);
        if (loadedCount === totalImages) {
          setTimeout(() => setIsLoading(false), 500);
        }
      };
      img.src = src;
    });
    
    // Shorter fallback timeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Max 2 seconds of loading
    
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <LoadingScreen onFinishLoading={() => setIsLoading(false)} duration={1500} />;
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="default" size="lg" className="rounded-full px-8">
                    Contact Us
                  </Button>
                </Link>
                <a 
                  href="https://drive.google.com/file/d/1lCoKIPFn63So99eKhnYt8w49DXo9_UAa/view?usp=sharing"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-full font-medium transition-all duration-300"
                >
                  <Download size={20} className="mr-2" />
                  Download Catalog
                </a>
              </div>
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
