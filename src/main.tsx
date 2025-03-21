
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

// Create a function to initialize the app
const initializeApp = () => {
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    createRoot(rootElement).render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
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
