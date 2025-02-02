'use client'

import React from 'react';

import { Container } from '@shared/ui';
import { AuthProvider } from '@features/auth/ui';

export default function Layout({ children }) {
  return (
        <AuthProvider>
          <Container>{children}</Container>
        </AuthProvider>
    );
};
