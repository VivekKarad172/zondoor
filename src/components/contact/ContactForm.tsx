
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactForm = () => {
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
  );
};

export default ContactForm;
