
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Index";
import Products from "./pages/ProductsPage";
import ProcessPage from "./pages/ProcessPage";
import About from "./pages/AboutPage";
import Gallery from "./pages/GalleryPage";
import Contact from "./pages/ContactPage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogPage from "./pages/BlogPage";
import BlogManagementPage from "./pages/BlogManagementPage";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./contexts/AuthContext";
import { MediaProvider } from "./contexts/media";
import { useIsMobile } from "./hooks/use-mobile";
import { Helmet } from "react-helmet";

function App() {
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <MediaProvider>
        <div className="relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog-management" element={<BlogManagementPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
        <WhatsAppButton 
          phoneNumber="+919601748998" 
          message={isMobile 
            ? "Hello, I'd like to enquire about your doors." 
            : "Hello, I'm interested in Z-ON DOOR products and would like more information about your PVC embossed doors."}
        />
        <Toaster position="top-right" />
      </MediaProvider>
    </div>
  );
}

export default App;
