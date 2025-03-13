import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
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
  const navLinks = [{
    name: "Home",
    href: isHomePage ? "#home" : "/"
  }, {
    name: "About",
    href: isHomePage ? "#about" : "/#about"
  }, {
    name: "Products",
    href: isHomePage ? "#products" : "/#products"
  }, {
    name: "Process",
    href: isHomePage ? "#process" : "/#process"
  }, {
    name: "Blog",
    href: "/blog"
  }, {
    name: "Contact",
    href: isHomePage ? "#contact" : "/#contact"
  }];
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-black/20 backdrop-blur-sm py-4")}>
      <div className="wesmarc-container">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png" alt="Z-ON DOOR Logo" className="h-20 md:h-22" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => <AnimateInView key={link.name} animation="fade-in" delay={index * 100 + 300}>
                <li>
                  {link.href.startsWith("/") ? <Link to={link.href} className={cn("text-sm font-medium transition-colors px-4 py-2", scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80")}>
                      {link.name.toUpperCase()}
                    </Link> : <a href={link.href} className={cn("text-sm font-medium transition-colors px-4 py-2", scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80")}>
                      {link.name.toUpperCase()}
                    </a>}
                </li>
              </AnimateInView>)}
            <li>
              <a href="#contact" className={cn("px-4 py-2 rounded text-sm ml-2 transition-colors", scrolled ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-gray-800 hover:bg-white/90")}>
                GET A QUOTE
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden flex items-center" aria-label="Toggle Menu">
            {isOpen ? <X size={24} className={scrolled ? "text-gray-800" : "text-white"} /> : <Menu size={24} className={scrolled ? "text-gray-800" : "text-white"} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={cn("fixed inset-0 bg-white z-50 transition-transform duration-300 transform md:hidden", isOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="flex justify-end p-6">
            <button onClick={toggleMenu} aria-label="Close Menu">
              <X size={24} className="text-secondary" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <img src="/lovable-uploads/b8cb2ade-faa3-464d-b0b9-7d0a8c03d6f1.png" alt="Z-ON DOOR Logo" className="h-16 mb-8" />
            <ul className="flex flex-col items-center space-y-6">
              {navLinks.map(link => <li key={link.name}>
                  {link.href.startsWith("/") ? <Link to={link.href} className="text-lg font-medium text-secondary" onClick={toggleMenu}>
                      {link.name}
                    </Link> : <a href={link.href} className="text-lg font-medium text-secondary" onClick={toggleMenu}>
                      {link.name}
                    </a>}
                </li>)}
              <li>
                <a href="#contact" className="bg-primary text-white px-6 py-2 rounded text-lg mt-4 hover:bg-primary/90 transition-colors" onClick={toggleMenu}>
                  GET A QUOTE
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;