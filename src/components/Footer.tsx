
import React from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "./ui/motion";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          <AnimateInView animation="fade-in" delay={100}>
            <div>
              <h3 className="text-xl font-display font-bold mb-6">Z-ON DOOR</h3>
              <p className="text-primary-foreground/80 mb-6">
                Premium PVC embossed doors with zero compromise on design and quality.
                Elevate your interior spaces with our precision-crafted doors.
              </p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={`Visit our ${social} page`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </AnimateInView>

          <AnimateInView animation="fade-in" delay={200}>
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "#home" },
                  { name: "About", href: "#about" },
                  { name: "Products", href: "#products" },
                  { name: "Process", href: "#process" },
                  { name: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateInView>

          <AnimateInView animation="fade-in" delay={300}>
            <div>
              <h3 className="text-lg font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="h-6 w-6 mr-3 flex-shrink-0 flex items-center justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-primary-foreground/80">
                    Z-ON DOOR Manufacturing Facility<br />
                    Plot No-4, Dhoran Pardi, NH-48<br />
                    Kamrej, Surat - 394150<br />
                    Gujarat, India
                  </span>
                </li>
                <li className="flex">
                  <span className="h-6 w-6 mr-3 flex-shrink-0 flex items-center justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3746C21.0391 21.7497 20.5099 21.9604 19.96 21.96C18.36 21.96 16.8 21.67 15.32 21.12C12.77 20.09 10.49 18.28 8.5 16.29C6.51 14.3 4.7 12.02 3.67 9.47C3.12 8 2.83 6.43 2.83 4.84C2.83 4.29237 3.03895 3.76494 3.4127 3.38689C3.78645 3.00884 4.31056 2.8 4.86 2.8H7.86C8.92 2.8 9.82 3.53 10.07 4.56C10.29 5.46 10.6 6.33 11 7.14C11.38 7.9 11.23 8.82 10.64 9.42L9.35 10.71C10.2482 12.6105 11.7771 14.1394 13.68 15.04L14.97 13.75C15.27 13.45 15.68 13.28 16.11 13.28C16.32 13.28 16.54 13.32 16.74 13.41C17.55 13.81 18.42 14.12 19.33 14.34C20.38 14.59 21.12 15.51 21.12 16.59L22 16.92Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-primary-foreground/80">
                    +91 96017 48998
                  </span>
                </li>
                <li className="flex">
                  <span className="h-6 w-6 mr-3 flex-shrink-0 flex items-center justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6L12 13L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-primary-foreground/80">
                    info@zondoor.com
                  </span>
                </li>
              </ul>
            </div>
          </AnimateInView>
        </div>

        <div className="py-6 border-t border-white/10 text-center">
          <p className="text-primary-foreground/70 text-sm">
            © {new Date().getFullYear()} Z-ON DOOR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
