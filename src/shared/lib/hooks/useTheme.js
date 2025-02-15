'use client';

import { useState, useEffect } from 'react';
import { theme } from '@shared/theme';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(theme.light);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    setCurrentTheme(prefersDarkMode.matches ? theme.dark : theme.light);

    const handleThemeChange = (e) => {
      setCurrentTheme(e.matches ? theme.dark : theme.light);
    };

    prefersDarkMode.addEventListener('change', handleThemeChange);

    return () => {
      prefersDarkMode.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return currentTheme;
};
