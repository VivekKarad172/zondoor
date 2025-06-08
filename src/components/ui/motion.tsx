
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
    | "slide-in-right"
    | "zoom-in"
    | "bounce-in";
  delay?: number;
  threshold?: number;
  once?: boolean;
  duration?: number;
}

export const AnimateInView = ({
  children,
  className,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  once = true,
  duration = 600,
}: AnimateInViewProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger animation earlier
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
  }, [threshold, once, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? `animate-${animation}` : "opacity-0 translate-y-8",
        className
      )}
      style={{ 
        animationDuration: `${duration}ms`,
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
  staggerDelay = 150,
  animation = "fade-in",
  startDelay = 0,
}: StaggerContainerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, startDelay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
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
  }, [startDelay]);

  return (
    <div ref={ref} className={cn(className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child as React.ReactElement<any>, {
          className: cn(
            child.props.className, 
            "transition-all duration-600 ease-out",
            isVisible ? `animate-${animation}` : "opacity-0 translate-y-6"
          ),
          style: {
            ...child.props.style,
            animationDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
            animationFillMode: "forwards"
          }
        });
      })}
    </div>
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
}

export const ScrollReveal = ({
  children,
  className,
  direction = "up",
  distance = 30,
  duration = 600,
  delay = 0,
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px",
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
  }, [delay]);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-out", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : getInitialTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? "0ms" : "0ms",
      }}
    >
      {children}
    </div>
  );
};

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export const Parallax = ({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxProps) => {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setOffsetY(direction === "up" ? rate : -rate);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        transform: `translateY(${offsetY}px)`,
      }}
    >
      {children}
    </div>
  );
};
