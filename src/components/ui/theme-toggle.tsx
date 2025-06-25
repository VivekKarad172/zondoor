
import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  variant = 'ghost',
  size = 'default',
  showText = false
}) => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        'transition-colors',
        className
      )}
      aria-label={`Switch to ${themeMode === 'purple' ? 'teal' : 'purple'} theme`}
    >
      <Palette className="h-4 w-4" />
      {showText && (
        <span className="ml-2 capitalize">
          {themeMode === 'purple' ? 'Teal' : 'Purple'} Theme
        </span>
      )}
    </Button>
  );
};
