
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import BackgroundDoors from "@/components/BackgroundDoors";
import { Helmet } from "react-helmet";

const GalleryPage = () => {
  useEffect(() => {
    // Update document title with SEO keywords
    document.title = "PVC Door Gallery | Bathroom, Bedroom & Interior Doors | Z-on Door";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Prefetch critical resources
    const criticalImages = [
      "/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png",
      "/lovable-uploads/c9565cf2-322b-42b1-99bd-bbad8bfa8263.png"
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>PVC Door Gallery | Bathroom, Bedroom & Interior Doors | Z-on Door</title>
        <meta name="description" content="View our premium PVC door gallery featuring waterproof doors for bathroom, toilet, bedroom and interior spaces. Termite-proof, long-lasting doors for washroom and home interiors." />
        <meta name="keywords" content="pvc door gallery, bathroom door designs, bedroom door styles, interior door collection, waterproof door options, washroom doors" />
        {/* Add caching headers */}
        <meta http-equiv="Cache-Control" content="max-age=604800, must-revalidate" />
      </Helmet>
      <BackgroundDoors />
      <Navbar />
      <div className="pt-24">
        <Gallery />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default GalleryPage;
