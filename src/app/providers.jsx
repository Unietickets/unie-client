'use client'

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@shared/theme';

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}
