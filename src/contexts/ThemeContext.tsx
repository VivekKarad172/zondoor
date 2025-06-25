
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'purple' | 'teal';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('purple');

  useEffect(() => {
    // Apply CSS variables based on theme mode
    const root = document.documentElement;
    
    if (themeMode === 'teal') {
      // Teal theme colors
      root.style.setProperty('--primary', '178 69% 33%'); // #2E8B8B
      root.style.setProperty('--primary-foreground', '0 0% 100%'); // white
      root.style.setProperty('--secondary', '184 25% 35%'); // slightly darker teal
      root.style.setProperty('--secondary-foreground', '0 0% 100%'); // white
    } else {
      // Purple theme colors (original)
      root.style.setProperty('--primary', '260 75% 45%'); // #5627B0
      root.style.setProperty('--primary-foreground', '260 40% 98%');
      root.style.setProperty('--secondary', '250 19% 27%');
      root.style.setProperty('--secondary-foreground', '260 40% 98%');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'purple' ? 'teal' : 'purple');
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
