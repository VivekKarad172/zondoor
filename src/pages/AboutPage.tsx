import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import { AnimateInView } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  useEffect(() => {
    // Update document title with SEO keywords
    document.title = "About Z-on Door | Premium PVC Door Manufacturer | Bathroom & Interior Doors";

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return <div className="min-h-screen bg-background relative">
      <Navbar />
      <div className="pt-28 lg:pt-32">
        <About />
        
        <section className="section-padding bg-white">
          <div className="container px-4 md:px-8 mx-auto">
            <AnimateInView animation="fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-secondary">
                    Our Mission & Values
                  </h2>
                  <p className="text-foreground/80 mb-6">
                    At Z-ON DOOR, our mission is to provide waterproof, termite-proof PVC doors for bathroom, 
                    toilet, bedroom and interior spaces. We specialize in long-lasting, high-quality doors that 
                    combine aesthetic appeal with practical functionality for washroom and home interiors.
                  </p>
                  <ul className="space-y-3">
                    {["Quality - Waterproof and termite-proof PVC doors for long-lasting performance", "Affordable - Premium PVC doors for bathroom and bedroom at reasonable prices", "Innovation - Advanced manufacturing of interior and washroom doors", "Customer Satisfaction - Perfect door solutions for your interior needs", "Sustainability - Eco-friendly PVC door manufacturing processes"].map((item, index) => <li key={index} className="flex items-start">
                        <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="text-foreground/80">{item}</span>
                      </li>)}
                  </ul>
                </div>
                <div className="relative">
                  <img alt="Our Factory" src="/lovable-uploads/91cea29e-0435-4504-af4b-6641a11e5180.jpg" className="rounded-lg shadow-lg w-full h-full object-contain" />
                </div>
              </div>
            </AnimateInView>
          </div>
        </section>
        
        <section className="section-padding bg-secondary/10">
          <div className="container px-4 md:px-8 mx-auto">
            <AnimateInView animation="fade-in">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Why Choose Z-ON DOOR?
                </h2>
                <p className="text-foreground/80">
                  We're committed to providing doors that combine durability, aesthetic appeal, and value.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[{
                title: "Experienced Team",
                description: "Our skilled craftsmen have years of experience in door manufacturing"
              }, {
                title: "Quality Materials",
                description: "We use only the finest PVC and WPC materials for our doors"
              }, {
                title: "Customer Service",
                description: "Dedicated support team to address all your queries and requirements"
              }].map((item, index) => <AnimateInView key={index} animation="slide-in-up" delay={index * 100}>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                      <h3 className="text-xl font-bold mb-3 text-secondary">{item.title}</h3>
                      <p className="text-foreground/70">{item.description}</p>
                    </div>
                  </AnimateInView>)}
              </div>
              <div className="text-center mt-12">
                <Button asChild>
                  <Link to="/products">Explore Our Products</Link>
                </Button>
              </div>
            </AnimateInView>
          </div>
        </section>
      </div>
      <Footer />
    </div>;
};

export default AboutPage;
