'use client'

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';

import { useTheme } from '@shared/lib';

export function Providers({ children }) {
  const currentTheme = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}
