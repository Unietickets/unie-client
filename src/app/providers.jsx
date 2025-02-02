'use client'

import { ThemeProvider } from 'styled-components';
import { theme } from '@shared/theme';

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
