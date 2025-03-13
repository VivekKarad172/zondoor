import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundDoors from "@/components/BackgroundDoors";
import { AnimateInView } from "@/components/ui/motion";

const LocationPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const fallbackMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update document title
    document.title = "Our Location | Z-ON DOOR";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Load Google Maps API script with callback
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAFDt0a1tkHP-w9Jeb4ST5QGwJfquDS78Q&callback=initMap&libraries=maps,marker&v=beta";
    script.async = true;
    script.defer = true;
    
    // Define the callback function
    window.initMap = function() {
      console.log("Google Maps API loaded");
      
      // If the fallback map is showing, hide it when the API loads successfully
      if (fallbackMapRef.current) {
        fallbackMapRef.current.style.display = 'none';
      }
    };

    // Handle script load error by showing the fallback map
    script.onerror = () => {
      console.error("Failed to load Google Maps API");
      if (fallbackMapRef.current) {
        fallbackMapRef.current.style.display = 'block';
      }
    };

    document.head.appendChild(script);

    return () => {
      // Clean up
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      delete window.initMap;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundDoors />
      <Navbar />
      <div className="pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-8">
          <AnimateInView animation="fade-in" delay={100}>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">Visit Our Location</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find our manufacturing facility and showroom at the address below. We welcome you to visit us and explore our premium PVC door collection.
              </p>
            </div>
          </AnimateInView>
          
          <AnimateInView animation="fade-in" delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-secondary">Manufacturing Facility & Showroom</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-start">
                    <svg 
                      className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      Z-ON DOOR Manufacturing Facility<br />
                      Plot No-4, Dhoran Pardi, NH-48<br />
                      Kamrej, Surat - 394150<br />
                      Gujarat, India
                    </span>
                  </p>
                  <p className="flex items-center">
                    <svg 
                      className="w-5 h-5 mr-2 text-primary flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>+91 96017 48998</span>
                  </p>
                  <p className="flex items-center">
                    <svg 
                      className="w-5 h-5 mr-2 text-primary flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>zondoor1@gmail.com</span>
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary">Business Hours</h2>
                <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                  <div>Monday - Friday:</div>
                  <div>9:00 AM - 6:00 PM</div>
                  <div>Saturday:</div>
                  <div>10:00 AM - 4:00 PM</div>
                  <div>Sunday:</div>
                  <div>Closed</div>
                </div>
              </div>
            </div>
          </AnimateInView>
          
          <AnimateInView animation="fade-in" delay={300}>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div style={{ height: "400px", width: "100%" }} className="relative">
                <div ref={mapRef} id="map-container" style={{ height: "100%", width: "100%" }}>
                  {/* Map will be rendered as HTML, not as JSX elements */}
                  <gmp-map center="21.3176724,72.9553399" zoom="17" map-id="DEMO_MAP_ID" style={{ height: "100%", width: "100%" }}>
                    <gmp-advanced-marker position="21.3176724,72.9553399" title="Z-ON DOOR"></gmp-advanced-marker>
                  </gmp-map>
                </div>
                
                {/* Fallback iframe in case the new Maps API doesn't load */}
                <div ref={fallbackMapRef} id="fallback-map" className="absolute top-0 left-0 w-full h-full" style={{ display: "none" }}>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    style={{ border: 0 }} 
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAFDt0a1tkHP-w9Jeb4ST5QGwJfquDS78Q&q=21.3176724,72.9553399&zoom=17" 
                    allowFullScreen
                    title="Z-ON DOOR Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </AnimateInView>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default LocationPage;
