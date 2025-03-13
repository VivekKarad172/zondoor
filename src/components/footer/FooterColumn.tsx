
import React from "react";
import { AnimateInView } from "../ui/motion";

interface FooterColumnProps {
  children: React.ReactNode;
  delay?: number;
}

const FooterColumn = ({ children, delay = 100 }: FooterColumnProps) => {
  return (
    <AnimateInView animation="fade-in" delay={delay}>
      {children}
    </AnimateInView>
  );
};

export default FooterColumn;
