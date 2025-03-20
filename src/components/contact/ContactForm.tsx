
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import emailjs from '@emailjs/browser';
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveToSupabase = async () => {
    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          created_at: new Date().toISOString()
        }
      ]);
      
      if (error) {
        console.log('Supabase storage error:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.log('Error saving to Supabase:', err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // Configure EmailJS with the correct service ID, template ID, and public key
      emailjs.init("Dhi_nSPjB8lIwWJRa");
      
      // Create a template parameters object
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_name: "Z-on Door",
        reply_to: formData.email
      };

      // Use the correct service and template IDs
      const emailResponse = await emailjs.send(
        "service_d12z5pf",  // Your EmailJS service ID
        "template_41f2o47", // Your EmailJS template ID
        templateParams
      );

      console.log("EmailJS Response:", emailResponse);

      // If email was sent successfully, save to Supabase as well
      if (emailResponse.status === 200) {
        await saveToSupabase();
        
        // Show success toast and dialog
        toast.success("Thank you for reaching out! We will respond soon.");
        setShowSuccessDialog(true);
        
        // Reset the form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        throw new Error("Failed to send email. Status: " + emailResponse.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("There was a problem sending your message. Please try again later or contact us directly at zondoor1@gmail.com");
      toast.error("Failed to send your message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
      
      {submitError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      
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
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Message Sent Successfully
            </DialogTitle>
            <DialogDescription>
              Thank you for reaching out! We will respond soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <p className="text-center text-muted-foreground">
              We've received your message and will get back to you at {formData.email} as soon as possible.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactForm;
