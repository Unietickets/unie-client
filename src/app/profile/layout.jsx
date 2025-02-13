"use client";

import React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@core/routes";
import { Container } from "@shared/ui";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return
  }

  if (status === "unauthenticated") {
    router.push(ROUTES.signIn.href);
  }

  return (
    <Container>
      {status === "unauthenticated" && (
        <p>Loading...</p>
      )}
      {status === "authenticated" && (
        children
      )}
    </Container>
  );
}
