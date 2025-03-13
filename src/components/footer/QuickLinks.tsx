
import React from "react";

const QuickLinks = () => {
  return (
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
  );
};

export default QuickLinks;
