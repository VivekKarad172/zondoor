
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Home } from "lucide-react";
import { AnimateInView } from "./ui/motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: isHomePage ? "#home" : "/" },
    { name: "About", href: isHomePage ? "#about" : "/#about" },
    { name: "Products", href: isHomePage ? "#products" : "/#products" },
    { name: "Process", href: isHomePage ? "#process" : "/#process" },
    { name: "Contact", href: isHomePage ? "#contact" : "/#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
        scrolled ? "glass-effect" : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png" 
              alt="Z-ON DOOR Logo" 
              className="h-12 md:h-14" 
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <AnimateInView 
                key={link.name} 
                animation="fade-in" 
                delay={index * 100 + 300}
              >
                <li>
                  {isHomePage ? (
                    <a
                      href={link.href}
                      className="text-sm font-medium hover:text-primary transition-colors px-1 py-2 relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm font-medium hover:text-primary transition-colors px-1 py-2 relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </li>
              </AnimateInView>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-lg z-50 transition-transform duration-300 transform md:hidden",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex justify-end p-6">
            <button onClick={toggleMenu} aria-label="Close Menu">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <img 
              src="/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png" 
              alt="Z-ON DOOR Logo" 
              className="h-20 mb-8" 
            />
            <ul className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {isHomePage ? (
                    <a
                      href={link.href}
                      className="text-xl font-medium"
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-xl font-medium"
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
