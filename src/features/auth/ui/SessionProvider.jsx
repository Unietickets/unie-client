import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

import { ROUTES } from "@core/constants";

export const SessionProvider = ({ children }) => {
  const session = useSession();

  useEffect(() => {
    if (!session.data) {
        redirect(ROUTES.signUp.href);
    }
  }, [session.status]);

  return <>{children}</>;
};
