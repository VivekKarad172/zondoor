
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimateInView } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  useEffect(() => {
    // Update document title
    document.title = "Contact Us | Z-ON DOOR";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData);
    toast.success("Your message has been sent! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <div className="pt-28 lg:pt-32">
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <AnimateInView animation="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
              <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
                We're here to help with any questions or needs you might have
              </p>
            </AnimateInView>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <AnimateInView animation="slide-in-right">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input 
                        type="text" 
                        name="name" 
                        placeholder="Your Name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input 
                        type="email" 
                        name="email" 
                        placeholder="Your Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Input 
                        type="tel" 
                        name="phone" 
                        placeholder="Your Phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Textarea 
                        name="message" 
                        placeholder="Your Message" 
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </div>
              </AnimateInView>
              
              <AnimateInView animation="slide-in-left">
                <div>
                  <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <MapPin className="text-primary mt-1 mr-4" />
                        <div>
                          <h3 className="font-semibold text-lg">Our Location</h3>
                          <p className="text-muted-foreground">
                            Z-ON DOOR Manufacturing Facility<br />
                            Plot No-4, Dhoran Pardi, NH-48<br />
                            Kamrej, Surat - 394150<br />
                            Gujarat, India
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="text-primary mt-1 mr-4" />
                        <div>
                          <h3 className="font-semibold text-lg">Phone Number</h3>
                          <p className="text-muted-foreground">
                            +91 96017 48998
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="text-primary mt-1 mr-4" />
                        <div>
                          <h3 className="font-semibold text-lg">Email Address</h3>
                          <p className="text-muted-foreground">
                            zondoor1@gmail.com
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="text-primary mt-1 mr-4" />
                        <div>
                          <h3 className="font-semibold text-lg">Business Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Saturday: 9:00 AM - 6:00 PM<br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
                    <div className="space-y-4">
                      <a 
                        href="https://wa.me/919601748998?text=Hello,%20I'd%20like%20to%20enquire%20about%20your%20doors."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83212 6.75926 5.13534 7.96335C4.43856 9.16745 4.07031 10.5335 4.06755 11.9246C4.06479 13.3158 4.42858 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9 16.124 19.0625 17.6242 17.5623C19.1245 16.062 19.962 14.0377 19.962 11.928C19.962 9.81828 19.1245 7.79399 17.6242 6.29371L17.6 6.31999ZM12 18.53C10.8224 18.5308 9.66695 18.2023 8.66 17.58L8.33 17.4L5.89 18.09L6.57 15.69L6.38 15.36C5.69749 14.3258 5.33179 13.1209 5.332 11.889C5.33267 10.1525 6.02192 8.4874 7.23217 7.27716C8.44241 6.06691 10.1075 5.37766 11.844 5.37699C13.5805 5.37633 15.2456 6.06558 16.4558 7.27582C17.6661 8.48607 18.3553 10.1512 18.356 11.8877C18.3553 13.6242 17.6661 15.2893 16.4558 16.4996C15.2456 17.7098 13.5805 18.399 11.844 18.3997L12 18.53ZM15.06 13.2L14.56 12.96C14.56 12.96 13.86 12.64 13.46 12.44C13.38 12.44 13.3 12.4 13.22 12.4C13.0712 12.3999 12.9249 12.4385 12.7967 12.5125C12.6685 12.5865 12.5633 12.6933 12.49 12.82C12.49 12.82 12.41 12.92 11.81 13.62C11.7711 13.6785 11.7176 13.7266 11.6545 13.7602C11.5914 13.7938 11.5208 13.8118 11.45 13.8118C11.3792 13.8118 11.3086 13.7938 11.2455 13.7602C11.1824 13.7266 11.1289 13.6785 11.09 13.62L10.39 13.32C10.3016 13.269 10.2173 13.2126 10.138 13.151C9.71731 12.8754 9.33689 12.5435 9 12.17C8.94752 12.1108 8.89154 12.055 8.83 12.0066C8.77115 11.9623 8.71742 11.9123 8.67 11.8575C8.62317 11.8021 8.5842 11.741 8.554 11.675L8.52 11.6125C8.49646 11.5628 8.47798 11.5105 8.46488 11.4566C8.45178 11.4027 8.4442 11.3474 8.44229 11.2916C8.44039 11.2358 8.44418 11.1799 8.453 11.125C8.47 11 8.49 10.92 8.54 10.84C8.54 10.84 8.67 10.67 8.82 10.56C8.88963 10.5068 8.9418 10.4356 8.97148 10.3544C9.00116 10.2732 9.00729 10.1853 8.989 10.1C8.92 9.82999 8.56 9.12999 8.47 8.93999C8.42164 8.85096 8.35329 8.77411 8.27 8.71499C8.2 8.67499 8.13 8.63999 8.06 8.60999H7.57C7.49731 8.60987 7.42503 8.62233 7.35677 8.64686C7.28851 8.67138 7.22547 8.70757 7.17 8.75328C7.05719 8.84705 6.9671 8.96438 6.90517 9.09811C6.84324 9.23184 6.81093 9.37851 6.81 9.52699C6.81 9.74699 6.87 9.96999 6.96 10.17C7.30169 10.9332 7.77635 11.632 8.36 12.24L8.49 12.39C8.73 12.63 8.82 12.72 8.98 12.88C9.71891 13.5652 10.5952 14.0941 11.55 14.43C11.67 14.47 11.79 14.49 11.93 14.52C12.0404 14.5475 12.1518 14.5636 12.264 14.5682C12.3761 14.5728 12.4885 14.5659 12.6 14.5475C12.7989 14.5177 12.9881 14.4369 13.15 14.3125C13.2697 14.2304 13.3693 14.1225 13.442 13.9964C13.5147 13.8704 13.5588 13.7291 13.57 13.5838C13.57 13.47 13.57 13.35 13.57 13.27L13.53 13.21L13.06 13.19L15.06 13.2Z"/>
                        </svg>
                        Chat on WhatsApp
                      </a>
                      
                      <a 
                        href="tel:+919601748998"
                        className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        <Phone size={24} />
                        Call Us Now
                      </a>
                      
                      <a 
                        href="mailto:zondoor1@gmail.com"
                        className="flex items-center gap-3 p-3 bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100 transition-colors"
                      >
                        <Mail size={24} />
                        Email Us
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateInView>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <AnimateInView animation="fade-in">
              <h2 className="text-3xl font-bold text-center mb-8">Find Us on the Map</h2>
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-md h-[400px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.4383240551996!2d72.95302471493925!3d21.31779198578983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0456d67074e01%3A0x74c7a2335d27c8f3!2sKamrej%2C%20Surat%2C%20Gujarat%20394150!5e0!3m2!1sen!2sin!4v1686743476075!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Z-ON DOOR Location"
                ></iframe>
              </div>
            </AnimateInView>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
