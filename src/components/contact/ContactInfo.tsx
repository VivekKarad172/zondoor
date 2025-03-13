
import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
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
  );
};

export default ContactInfo;
