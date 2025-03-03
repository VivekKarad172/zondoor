
import React from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "./ui/motion";
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  company?: string;
  index: number;
}

const Testimonial = ({ quote, author, position, company, index }: TestimonialProps) => {
  return (
    <AnimateInView animation="fade-in" delay={index * 150}>
      <div className="bg-white rounded-lg p-6 border border-border/30 shadow-sm hover:shadow-md transition-shadow h-full">
        <Quote className="h-8 w-8 text-primary/20 mb-4" />
        <p className="text-foreground/80 italic mb-6">"{quote}"</p>
        <div className="flex items-center">
          <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center text-primary font-semibold text-lg">
            {author.charAt(0)}
          </div>
          <div className="ml-4">
            <p className="font-semibold">{author}</p>
            <p className="text-foreground/60 text-sm">
              {position}{company ? `, ${company}` : ""}
            </p>
          </div>
        </div>
      </div>
    </AnimateInView>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The quality of Z-ON PVC doors exceeded our expectations. They're perfect for our bathroom renovation - waterproof and stylish!",
      author: "Rajesh Sharma",
      position: "Homeowner",
      company: "Mumbai"
    },
    {
      quote: "As an interior designer, I recommend Z-ON doors to all my clients. The designs are modern and the quality is consistently excellent.",
      author: "Priya Patel",
      position: "Interior Designer",
      company: "Design Studio"
    },
    {
      quote: "We installed Z-ON doors in all our bathroom projects. Our clients love the quality and we appreciate the durability and water resistance.",
      author: "Vikram Singh",
      position: "Project Manager",
      company: "Construction Ltd"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="wesmarc-container">
        <AnimateInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-secondary">
              What Our Customers Say
            </h2>
            <p className="text-foreground/80">
              Don't just take our word for it. Here's what customers think about Z-ON DOOR products.
            </p>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              company={testimonial.company}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
