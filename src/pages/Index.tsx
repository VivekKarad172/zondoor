
import React, { useState, useEffect } from "react";
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
import { AnimateInView, ScrollReveal, StaggerContainer } from "@/components/ui/motion";
import ProductsSection from "@/components/product/ProductsSection";
import { Helmet } from "react-helmet";
import DownloadCatalogButton from "@/components/DownloadCatalogButton";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="min-h-screen bg-white relative">
      <Helmet>
        <title>Z-on Door | Best 3D PVC Doors Manufacturer in India</title>
        <meta name="description" content="Discover premium-quality 3D PVC doors for bathrooms, balconies, and bedrooms. Z-on Door offers durable and stylish WPC and PVC screen doors in Surat, Gujarat." />
      </Helmet>
      <Navbar />
      
      <ScrollReveal direction="down" duration={800}>
        <Hero />
      </ScrollReveal>
      
      <AnimateInView animation="slide-in-up" delay={200}>
        <About />
      </AnimateInView>
      
      <ScrollReveal direction="up" delay={100}>
        <ProductsSection />
      </ScrollReveal>
      
      <AnimateInView animation="slide-in-left" delay={150}>
        <Process />
      </AnimateInView>
      
      <ScrollReveal direction="right" delay={100}>
        <WhyChooseUs />
      </ScrollReveal>
      
      <AnimateInView animation="zoom-in" delay={200}>
        <Testimonials />
      </AnimateInView>
      
      <ScrollReveal direction="up" delay={150}>
        <Gallery />
      </ScrollReveal>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateInView animation="bounce-in" delay={100}>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-secondary">Get in Touch</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Have questions or need more information? Visit our contact page for details or to send us a message.
              </p>
              <StaggerContainer staggerDelay={200} animation="slide-in-up">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button variant="default" size="lg" className="rounded-full px-8 hover-lift">
                      Contact Us
                    </Button>
                  </Link>
                  <DownloadCatalogButton 
                    variant="primary" 
                    size="lg" 
                    className="rounded-full px-8 hover-scale"
                  />
                </div>
              </StaggerContainer>
            </div>
          </AnimateInView>
        </div>
      </section>
      
      <div id="contact">
        <AnimateInView animation="fade-in" delay={100}>
          <Footer />
        </AnimateInView>
      </div>
    </div>
  );
};

export default Index;
