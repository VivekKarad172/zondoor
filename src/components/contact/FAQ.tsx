
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { AnimateInView } from "@/components/ui/motion";

const FAQ = () => {
  const faqItems = [
    {
      question: "What is the typical delivery time for Z-ON DOOR products?",
      answer: "Standard delivery time for our doors is 7-14 working days, depending on your location and the complexity of your order. Custom designs may require additional time. We always strive to deliver as quickly as possible without compromising quality."
    },
    {
      question: "Do Z-ON DOOR products come with a warranty?",
      answer: "Yes, all Z-ON DOOR products come with a standard 2-year warranty covering manufacturing defects. Additionally, our door mechanisms carry a 5-year warranty. Please refer to your product documentation for specific warranty details."
    },
    {
      question: "Does Z-ON DOOR provide installation services?",
      answer: "Yes, we offer professional installation services for all our products. Our trained technicians ensure your doors are installed correctly for optimal performance and longevity. Installation services can be requested at the time of purchase."
    },
    {
      question: "What materials are used in Z-ON DOOR products?",
      answer: "We use high-quality materials including premium-grade steel, aluminum, and specialized composites. Our doors feature reinforced frames, weather-resistant seals, and durable finishes to ensure long-lasting performance in various environmental conditions."
    },
    {
      question: "Can I get a custom-designed door from Z-ON DOOR?",
      answer: "Absolutely! We specialize in custom door solutions. Our design team can work with you to create doors that meet your specific requirements for size, style, color, and functionality. Contact us to discuss your custom door project."
    },
    {
      question: "How do I maintain my Z-ON DOOR products?",
      answer: "Regular maintenance includes cleaning with mild soap and water, lubricating moving parts annually, and inspecting seals and weather stripping. We provide a detailed maintenance guide with each purchase to help you keep your doors in excellent condition."
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="text-primary h-6 w-6" />
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium text-base md:text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
