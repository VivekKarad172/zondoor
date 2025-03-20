
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
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Door Gallery | Z-on Door - 3D PVC Doors Manufacturer</title>
        <meta name="description" content="Explore our collection of premium 3D PVC doors for bathrooms, balconies, and bedrooms. View our stylish WPC and PVC screen doors manufactured in Surat, Gujarat." />
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
