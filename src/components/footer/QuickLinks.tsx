
import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6">Quick Links</h3>
      <ul className="space-y-3">
        {[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Products", href: "/products" },
          { name: "Process", href: "/process" },
          { name: "Gallery", href: "/gallery" },
          { name: "Blog", href: "/blog" },
          { name: "Contact", href: "/contact" },
        ].map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
