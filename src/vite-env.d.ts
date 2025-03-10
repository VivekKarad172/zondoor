
/// <reference types="vite/client" />

// Declare the Google Maps Web Components
declare namespace JSX {
  interface IntrinsicElements {
    'gmp-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      center?: string;
      zoom?: string | number;
      'map-id'?: string;
    };
    'gmp-advanced-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      position?: string;
      title?: string;
    };
  }
}

// Extend Window interface to include initMap
interface Window {
  initMap?: () => void;
}
