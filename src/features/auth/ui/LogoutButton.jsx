'use client'

import React from 'react';
import { signOut } from 'next-auth/react';

import { Button } from '@shared/ui';

export const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({
      redirect: false
    });
  };

  return (
    <Button
      onClick={handleLogout}
      variant="primaryOutlined"
      size="medium"
      color="error"
    >
      Выйти
    </Button>
  );
};
