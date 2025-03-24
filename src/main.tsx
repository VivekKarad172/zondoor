
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

// Create a function to initialize the app
const initializeApp = () => {
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    // Create a placeholder for first contentful paint
    rootElement.innerHTML = '<div class="loading-screen"><div class="loader"></div></div>';
    
    // Use requestIdleCallback for non-critical initialization
    const startApp = () => {
      createRoot(rootElement).render(
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      );
    };
    
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(startApp);
    } else {
      setTimeout(startApp, 10);
    }
  } else {
    console.error("Root element not found");
  }
};

// Wait for DOM to be fully loaded before rendering
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM already loaded, initialize immediately
  initializeApp();
}

// Add service worker registration for caching
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered:', registration);
    }).catch(error => {
      console.log('SW registration failed:', error);
    });
  });
}
