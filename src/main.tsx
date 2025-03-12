
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

// Wait for DOM to be fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
});
