
import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface SituationalThemeProps {
  trigger?: 'scroll' | 'hover' | 'time' | 'device' | 'page';
  condition?: boolean;
  scrollThreshold?: number;
  timeRange?: { start: number; end: number }; // 24-hour format
  targetTheme?: 'purple' | 'teal';
  children?: React.ReactNode;
}

export const SituationalTheme: React.FC<SituationalThemeProps> = ({
  trigger = 'scroll',
  condition,
  scrollThreshold = 500,
  timeRange,
  targetTheme = 'teal',
  children
}) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    if (condition !== undefined) {
      setThemeMode(condition ? targetTheme : 'purple');
      return;
    }

    switch (trigger) {
      case 'scroll':
        const handleScroll = () => {
          const shouldSwitch = window.scrollY > scrollThreshold;
          setThemeMode(shouldSwitch ? targetTheme : 'purple');
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);

      case 'time':
        if (timeRange) {
          const checkTime = () => {
            const now = new Date().getHours();
            const inRange = now >= timeRange.start && now <= timeRange.end;
            setThemeMode(inRange ? targetTheme : 'purple');
          };
          
          checkTime();
          const interval = setInterval(checkTime, 60000); // Check every minute
          return () => clearInterval(interval);
        }
        break;

      case 'device':
        const isMobile = window.innerWidth < 768;
        setThemeMode(isMobile ? targetTheme : 'purple');
        
        const handleResize = () => {
          const isMobile = window.innerWidth < 768;
          setThemeMode(isMobile ? targetTheme : 'purple');
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }
  }, [trigger, condition, scrollThreshold, timeRange, targetTheme, setThemeMode]);

  return <>{children}</>;
};
