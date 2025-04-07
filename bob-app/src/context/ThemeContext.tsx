'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available themes
export type ThemeType = 'light' | 'dark' | 'blue' | 'purple' | 'green' | 'high-contrast' | 'winter' | 'spring' | 'summer' | 'autumn';

// Theme context type definition
type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  systemTheme: string;
};

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'blue', // Default theme
  setTheme: () => {},
  systemTheme: 'light',
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Props for the provider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Helper function to get seasonal theme based on current month
const getSeasonalTheme = (): ThemeType => {
  const month = new Date().getMonth(); // 0-based, 0 = January, 11 = December
  
  if (month >= 0 && month <= 1) return 'winter'; // Jan, Feb
  if (month >= 2 && month <= 4) return 'spring'; // Mar, Apr, May
  if (month >= 5 && month <= 7) return 'summer'; // Jun, Jul, Aug
  if (month >= 8 && month <= 10) return 'autumn'; // Sep, Oct, Nov
  return 'winter'; // Dec
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize theme from localStorage or use default
  const [theme, setThemeState] = useState<ThemeType>('blue');
  const [systemTheme, setSystemTheme] = useState<string>('light');

  // Effect to load saved theme on component mount
  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('bobTheme') as ThemeType;
    
    if (savedTheme) {
      setThemeState(savedTheme);
    } else {
      // If no saved theme, check system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const systemIsDark = mediaQuery.matches;
      setSystemTheme(systemIsDark ? 'dark' : 'light');
      
      // If theme is set to 'system', use system preference
      if (savedTheme === 'system') {
        setThemeState(systemIsDark ? 'dark' : 'light');
      }
    }
    
    // Listen for changes in system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Function to set the theme
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('bobTheme', newTheme);
    
    // Apply theme class to body
    document.documentElement.className = newTheme;
  };

  // Auto-switch to seasonal theme if it's a special date
  useEffect(() => {
    const checkForSpecialDates = () => {
      const currentDate = new Date();
      const month = currentDate.getMonth(); // 0-11
      const day = currentDate.getDate(); // 1-31
      
      // Check if it's a special holiday to apply a seasonal theme
      // Christmas
      if (month === 11 && (day >= 20 && day <= 26)) {
        // Only change if not explicitly set by user
        if (!localStorage.getItem('bobTheme')) {
          setTheme('winter');
        }
      }
      // Halloween
      else if (month === 9 && (day >= 25 && day <= 31)) {
        if (!localStorage.getItem('bobTheme')) {
          setTheme('autumn');
        }
      }
      // Spring equinox (around March 20)
      else if (month === 2 && (day >= 18 && day <= 22)) {
        if (!localStorage.getItem('bobTheme')) {
          setTheme('spring');
        }
      }
      // Summer solstice (around June 21)
      else if (month === 5 && (day >= 19 && day <= 23)) {
        if (!localStorage.getItem('bobTheme')) {
          setTheme('summer');
        }
      }
    };
    
    checkForSpecialDates();
  }, []);

  // Apply theme class on theme change
  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove(
      'light', 
      'dark', 
      'blue', 
      'purple', 
      'green',
      'high-contrast',
      'winter',
      'spring',
      'summer',
      'autumn'
    );
    // Add current theme class
    document.documentElement.classList.add(theme);
    
    // Add theme-transition class for smooth transitions
    document.documentElement.classList.add('theme-transition');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 