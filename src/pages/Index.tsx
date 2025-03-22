
import React, { useState } from "react";
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
import DownloadCatalogButton from "@/components/DownloadCatalogButton";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simpler loading logic with shorter duration
  React.useEffect(() => {
    // Set a shorter timeout for the loading screen
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Reduced from 1500ms to 800ms
    
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <LoadingScreen onFinishLoading={() => setIsLoading(false)} duration={800} />; // Reduced duration
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Helmet>
        <title>Z-on Door | Best 3D PVC Doors Manufacturer in India</title>
        <meta name="description" content="Discover premium-quality 3D PVC doors for bathrooms, balconies, and bedrooms. Z-on Door offers durable and stylish WPC and PVC screen doors in Surat, Gujarat." />
        {/* Preload critical assets */}
        <link rel="preload" href="/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png" as="image" />
        <link rel="preload" href="/lovable-uploads/c9565cf2-322b-42b1-99bd-bbad8bfa8263.png" as="image" />
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
                <DownloadCatalogButton 
                  variant="primary" 
                  size="lg" 
                  className="rounded-full px-8"
                />
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
