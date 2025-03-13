
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useLazyLoading() {
  React.useEffect(() => {
    // Select all images that should be lazy-loaded
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      lazyImages.forEach(img => {
        if (img instanceof HTMLImageElement) {
          img.onload = () => {
            img.classList.add('loaded');
          };
        }
      });
    } else {
      // Fallback for browsers that don't support native lazy loading
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
              const img = entry.target;
              img.onload = () => {
                img.classList.add('loaded');
              };
              img.src = img.dataset.src || img.src;
              imageObserver.unobserve(img);
            }
          });
        });
        
        lazyImages.forEach(img => {
          imageObserver.observe(img);
        });
      }
    }
  }, []);
}
