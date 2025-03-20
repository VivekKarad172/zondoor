import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import { AnimateInView } from "@/components/ui/motion";

const ProcessPage = () => {
  useEffect(() => {
    // Update document title
    document.title = "Our Process | Z-on Door - 3D PVC Doors Manufacturer";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <div className="pt-28 lg:pt-32">
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <AnimateInView animation="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Manufacturing Process</h1>
              <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
                Quality control at every step ensures our doors meet the highest standards
              </p>
            </AnimateInView>
          </div>
        </section>
        
        <Process />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <AnimateInView animation="fade-in">
              <div className="bg-white rounded-lg shadow p-8 text-center max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Want to See Our Factory?</h2>
                <p className="mb-6 text-gray-600">
                  We welcome visitors to our factory to see our manufacturing process firsthand.
                  Schedule a visit and see how we create our premium doors.
                </p>
                <a 
                  href="https://wa.me/919876543210?text=Hello,%20I'd%20like%20to%20schedule%20a%20factory%20visit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Schedule a Visit
                </a>
              </div>
            </AnimateInView>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProcessPage;
