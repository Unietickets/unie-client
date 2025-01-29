'use client'

import React from 'react';

import { AuthProvider } from '@features/auth/ui';

export default function Layout({ children }) {
  return (
        <AuthProvider>
          {children}
        </AuthProvider>
    );
};