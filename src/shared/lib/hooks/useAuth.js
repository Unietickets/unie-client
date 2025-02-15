'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { ROUTES } from "@core/routes";
import { Container } from "@shared/ui";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(ROUTES.signIn.href);
    }
  }, [status]);

  const AuthWrapper = ({ children }) => (
    <Container>
      {status === "unauthenticated" && (
        <p>Loading...</p>
      )}
      {status === "authenticated" && (
        {children}
      )}
    </Container>
  );

  return AuthWrapper;
}
