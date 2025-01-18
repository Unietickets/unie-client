'use client'

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from 'react';

export const Session = () => {
    const session = useSession();

    return (
        <div>
          <h1>Добро пожаловать, {session.data ? session.data?.user.email : "гость"}!</h1>
          {session.status === 'authenticated' ? (
            <button onClick={() => signOut()}>Выйти</button>
          ) : (
            <Link href="api/auth/signin">Войти</Link>
          )}
        </div>
    )
};
