
import React from 'react';

interface SituationalThemeProps {
  trigger?: 'scroll' | 'hover' | 'time' | 'device' | 'page';
  condition?: boolean;
  scrollThreshold?: number;
  timeRange?: { start: number; end: number };
  targetTheme?: 'purple' | 'teal';
  children?: React.ReactNode;
}

// This component is no longer needed since we're using a fixed color scheme
export const SituationalTheme: React.FC<SituationalThemeProps> = ({ children }) => {
  return <>{children}</>;
};
