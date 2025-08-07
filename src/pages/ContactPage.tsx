
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimateInView } from "@/components/ui/motion";
import { ContactForm, ContactInfo, SocialConnect, LocationMap, FAQ } from "@/components/contact";
import { Helmet } from "react-helmet";

const ContactPage = () => {
  useEffect(() => {
    // Update document title with SEO keywords
    document.title = "Contact Z-on Door | PVC Doors for Bathroom, Bedroom & Interior | Surat";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Contact Z-on Door | PVC Doors for Bathroom, Bedroom & Interior | Surat</title>
        <meta name="description" content="Contact Z-on Door for waterproof PVC doors for bathroom, toilet, bedroom & interior. Get quotes for termite-proof, long-lasting doors in Surat, Gujarat." />
        <meta name="keywords" content="contact pvc door manufacturer, bathroom door quote, bedroom door price, interior door supplier surat, waterproof door dealer" />
      </Helmet>
      <Navbar />
      <div className="pt-28 lg:pt-32">
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <AnimateInView animation="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
              <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
                We're here to help with any questions or needs you might have
              </p>
            </AnimateInView>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <AnimateInView animation="slide-in-right">
                <ContactForm />
              </AnimateInView>
              
              <AnimateInView animation="slide-in-left">
                <div>
                  <ContactInfo />
                  <SocialConnect />
                </div>
              </AnimateInView>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <AnimateInView animation="fade-in">
              <h2 className="text-3xl font-bold text-center mb-8">Find Us on the Map</h2>
              <LocationMap />
            </AnimateInView>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <AnimateInView animation="fade-in">
              <h2 className="text-3xl font-bold text-center mb-8">Common Questions</h2>
              <FAQ />
            </AnimateInView>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
