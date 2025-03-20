
import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Index";
import WhatsAppButton from "./components/WhatsAppButton";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./contexts/AuthContext";
import { MediaProvider } from "./contexts/media";
import { useIsMobile } from "./hooks/use-mobile";
import { Helmet } from "react-helmet";
import { Skeleton } from "./components/ui/skeleton";

// Lazy load non-home pages to improve initial load performance
const Products = lazy(() => import("./pages/ProductsPage"));
const ProcessPage = lazy(() => import("./pages/ProcessPage"));
const About = lazy(() => import("./pages/AboutPage"));
const Gallery = lazy(() => import("./pages/GalleryPage"));
const Contact = lazy(() => import("./pages/ContactPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogManagementPage = lazy(() => import("./pages/BlogManagementPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Simpler loading fallback for better performance
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md p-8">
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-64 w-full mb-4" />
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  // Preload critical assets
  useEffect(() => {
    const preloadImages = [
      "/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png", // Logo
      "/lovable-uploads/c9565cf2-322b-42b1-99bd-bbad8bfa8263.png"  // Hero image
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Add font display swap for better loading performance */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap&display=swap" />
      </Helmet>
      <MediaProvider>
        <div className="relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={
                <Suspense fallback={<PageLoader />}>
                  <About />
                </Suspense>
              } />
              <Route path="/products" element={
                <Suspense fallback={<PageLoader />}>
                  <Products />
                </Suspense>
              } />
              <Route path="/process" element={
                <Suspense fallback={<PageLoader />}>
                  <ProcessPage />
                </Suspense>
              } />
              <Route path="/gallery" element={
                <Suspense fallback={<PageLoader />}>
                  <Gallery />
                </Suspense>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<PageLoader />}>
                  <Contact />
                </Suspense>
              } />
              <Route path="/blog/:id" element={
                <Suspense fallback={<PageLoader />}>
                  <BlogPostPage />
                </Suspense>
              } />
              <Route path="/blog" element={
                <Suspense fallback={<PageLoader />}>
                  <BlogPage />
                </Suspense>
              } />
              <Route path="/blog-management" element={
                <Suspense fallback={<PageLoader />}>
                  <BlogManagementPage />
                </Suspense>
              } />
              <Route path="*" element={
                <Suspense fallback={<PageLoader />}>
                  <NotFound />
                </Suspense>
              } />
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
