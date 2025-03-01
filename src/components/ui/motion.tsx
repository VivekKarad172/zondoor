
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimateInViewProps {
  children: React.ReactNode;
  className?: string;
  animation?: 
    | "fade-in"
    | "slide-in-up" 
    | "slide-in-down" 
    | "slide-in-left" 
    | "slide-in-right";
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export const AnimateInView = ({
  children,
  className,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimateInViewProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? `animate-${animation}` : "opacity-0",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards"
      }}
    >
      {children}
    </div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: string;
  startDelay?: number;
}

export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 100,
  animation = "fade-in",
  startDelay = 0,
}: StaggerContainerProps) => {
  return (
    <div className={cn(className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child as React.ReactElement<any>, {
          className: cn(child.props.className, `animate-${animation}`),
          style: {
            ...child.props.style,
            animationDelay: `${startDelay + index * staggerDelay}ms`,
            animationFillMode: "forwards"
          }
        });
      })}
    </div>
  );
};
