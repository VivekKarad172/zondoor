
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import BackgroundDoors from "@/components/BackgroundDoors";

const GalleryPage = () => {
  useEffect(() => {
    // Update document title
    document.title = "Door Gallery | Z-ON DOOR";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
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
