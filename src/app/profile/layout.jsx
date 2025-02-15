'use client';

import React from "react";

import { useAuth } from "@shared/lib";

export default function Layout({ children }) {
  const AuthWrapper = useAuth();

  return (
    <AuthWrapper>
      {children}
    </AuthWrapper>
  );
}
