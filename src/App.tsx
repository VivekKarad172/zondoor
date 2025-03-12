
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Index"; // Fixed import path
import Products from "./components/Products";
import Contact from "./pages/LocationPage"; // Fixed import path
import About from "./components/About"; // Fixed import path
import Gallery from "./components/Gallery";
import BlogPostPage from "./pages/BlogPostPage";
import BlogPage from "./pages/BlogPage";
import BlogManagementPage from "./pages/BlogManagementPage";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./contexts/AuthContext";
import { MediaProvider } from "./contexts/MediaContext";

function App() {
  const location = useLocation();
  const { user } = useAuth(); // Remove the checkAuth that doesn't exist

  return (
    <div className="App">
      <MediaProvider>
        <div className="relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog-management" element={<BlogManagementPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
        {/* Add required props to WhatsAppButton */}
        <WhatsAppButton 
          phoneNumber="+919876543210" 
          message="Hello, I'd like to enquire about your products."
        />
        <Toaster position="top-right" />
      </MediaProvider>
    </div>
  );
}

export default App;
