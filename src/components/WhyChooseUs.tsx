
import React from "react";
import { cn } from "@/lib/utils";
import { Shield, Droplets, Bug, Clock, Award } from "lucide-react";
import { AnimateInView, StaggerContainer } from "./ui/motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  return (
    <AnimateInView animation="fade-in" delay={index * 150}>
      <div className="bg-white rounded-lg p-6 shadow-md border border-border/30 h-full hover:shadow-lg transition-shadow">
        <div className="flex flex-col h-full">
          <div className="mb-4 text-primary">{icon}</div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-foreground/70 text-sm leading-relaxed flex-grow">{description}</p>
        </div>
      </div>
    </AnimateInView>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "High-Quality Materials",
      description: "Our doors are crafted with premium 5mm PVC foam board and 0.15mm decorative film for lasting quality and appearance."
    },
    {
      icon: <Droplets className="h-10 w-10" />,
      title: "100% Waterproof",
      description: "Z-ON PVC doors are completely waterproof, making them perfect for bathrooms, toilets, and other moisture-prone areas."
    },
    {
      icon: <Bug className="h-10 w-10" />,
      title: "Termite & Pest Proof",
      description: "Unlike wooden doors, our PVC doors are resistant to termites and pests, ensuring long-term durability."
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Low Maintenance",
      description: "Our doors require minimal maintenance - simply wipe clean with a damp cloth. No painting or polishing needed."
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Affordable Luxury",
      description: "Get the look and feel of premium doors at a fraction of the cost of traditional wooden doors."
    },
  ];

  return (
    <section id="why-choose-us" className="section-padding bg-gray-50">
      <div className="wesmarc-container">
        <AnimateInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-secondary">
              The Z-ON DOOR Advantage
            </h2>
            <p className="text-foreground/80">
              Our PVC doors combine beauty, durability, and practicality to offer you the perfect solution for modern interiors.
            </p>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        {/* Certification Section */}
        <AnimateInView animation="fade-in" delay={300}>
          <div className="bg-white p-8 rounded-lg shadow-md border border-border/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">Certified Quality</h3>
                <p className="text-foreground/80 mb-6">
                  Our commitment to excellence is backed by industry certifications and rigorous quality control processes.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <span className="text-sm font-semibold">ISO 9001</span>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <span className="text-sm font-semibold">CE Certified</span>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <span className="text-sm font-semibold">Green Product</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative bg-gray-100 p-6 rounded-lg w-full max-w-md">
                  <div className="text-center">
                    <div className="bg-primary/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                      <span className="text-4xl font-bold text-primary">5+</span>
                    </div>
                    <h4 className="text-lg font-bold mb-1">Years of Excellence</h4>
                    <p className="text-sm text-foreground/70">
                      Trusted by thousands of customers across the country
                    </p>
                  </div>
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <div className="flex justify-between text-center">
                      <div>
                        <span className="block text-2xl font-bold text-primary">10K+</span>
                        <span className="text-xs text-foreground/70">Doors Installed</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-primary">98%</span>
                        <span className="text-xs text-foreground/70">Satisfaction Rate</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-primary">24h</span>
                        <span className="text-xs text-foreground/70">Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default WhyChooseUs;
