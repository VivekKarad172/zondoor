
import React from "react";
import { cn } from "@/lib/utils";
import { 
  SocialLinks, 
  QuickLinks, 
  ContactInfo, 
  FooterCopyright,
  FooterColumn 
} from "./footer";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          <FooterColumn delay={100}>
            <div>
              <h3 className="text-xl font-display font-bold mb-6">Z-ON DOOR</h3>
              <p className="text-primary-foreground/80 mb-6">
                Premium PVC embossed doors with zero compromise on design and quality.
                Elevate your interior spaces with our precision-crafted doors.
              </p>
              <SocialLinks />
            </div>
          </FooterColumn>

          <FooterColumn delay={200}>
            <QuickLinks />
          </FooterColumn>

          <FooterColumn delay={300}>
            <ContactInfo />
          </FooterColumn>
        </div>

        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
