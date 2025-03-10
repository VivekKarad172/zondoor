
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GalleryPage from "./pages/GalleryPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogManagementPage from "./pages/BlogManagementPage";
import LocationPage from "./pages/LocationPage";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { AuthProvider } from "./contexts/AuthContext";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          
          {isLoading && (
            <LoadingScreen onFinishLoading={() => setIsLoading(false)} />
          )}
          
          <div className={isLoading ? "hidden" : "block"}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/blog-management" element={<BlogManagementPage />} />
                <Route path="/location" element={<LocationPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
          
          {/* WhatsApp Button (visible on all pages when not loading) */}
          {!isLoading && (
            <WhatsAppButton 
              phoneNumber="+919601748998" 
              message="Hello, I'm interested in your PVC doors!" 
            />
          )}
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
