
import React from "react";
import { AnimateInView } from "@/components/ui/motion";
import ProcessVideo from "./ProcessVideo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProcessVideoSection = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
      
      <div className="container mx-auto px-4">
        <AnimateInView animation="fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Manufacturing Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how we craft premium quality PVC embossed doors with precision and care
            </p>
          </div>
        </AnimateInView>
        
        <AnimateInView animation="fade-in" delay={200}>
          <ProcessVideo />
        </AnimateInView>
        
        <AnimateInView animation="fade-in" delay={300}>
          <div className="text-center mt-10">
            <Link to="/process">
              <Button variant="outline" className="group">
                Explore Our Full Process
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default ProcessVideoSection;
