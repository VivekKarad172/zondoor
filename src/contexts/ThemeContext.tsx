
// This file is no longer needed as we're using a fixed color scheme
// The theme is now handled through CSS variables in base.css
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const useTheme = () => {
  return {
    themeMode: 'teal',
    setThemeMode: () => {},
    toggleTheme: () => {}
  };
};
