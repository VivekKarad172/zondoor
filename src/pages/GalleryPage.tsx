
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import BackgroundDoors from "@/components/BackgroundDoors";
import { Helmet } from "react-helmet";

const GalleryPage = () => {
  useEffect(() => {
    // Update document title
    document.title = "Door Gallery | Z-on Door - 3D PVC Doors Manufacturer";
    
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
        <title>Door Gallery | Z-on Door - 3D PVC Doors Manufacturer</title>
        <meta name="description" content="Explore our collection of premium 3D PVC doors for bathrooms, balconies, and bedrooms. View our stylish WPC and PVC screen doors manufactured in Surat, Gujarat." />
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
