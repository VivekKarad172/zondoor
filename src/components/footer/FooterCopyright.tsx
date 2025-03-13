
import React from "react";

const FooterCopyright = () => {
  return (
    <div className="py-6 border-t border-white/10 text-center">
      <p className="text-primary-foreground/70 text-sm">
        © {new Date().getFullYear()} Z-ON DOOR. All rights reserved.
      </p>
    </div>
  );
};

export default FooterCopyright;
