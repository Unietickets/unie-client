"use client";

import { SessionProvider } from "next-auth/react";

import { SessionProvider as MySessionProvider } from "./SessionProvider";

export const AuthProvider = ({ children }) => (
    <SessionProvider>
        {/* <MySessionProvider> */}
            {children}
        {/* </MySessionProvider> */}
    </SessionProvider>
);