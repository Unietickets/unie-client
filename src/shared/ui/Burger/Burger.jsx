"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import { AUTHORIZED_ROUTES, PUBLIC_ROUTES } from "@core/routes";
import { useOutsideClick } from "@shared/lib";


import { Portal } from "../Portal";
import { Menu } from "../Icons";

import * as S from "./Burger.styles";

export const Burger = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const routes = useMemo(() => {
    if (status === "authenticated") {
      return AUTHORIZED_ROUTES;
    }

    return PUBLIC_ROUTES;
  }, [status]);

  const handleClickOutside = () => {
    setIsOpen(false);
  }

  const ref = useOutsideClick(handleClickOutside);

  return (
    <>
      <Menu onClick={() => setIsOpen((prev) => !prev)} />
      {isOpen && (
        <Portal>
          <S.Wrapper ref={ref}>
            <S.TextLogo onClick={() => setIsOpen((prev) => !prev)}>UnieTicket</S.TextLogo>
            <S.Menu>
              {routes.map((route) => (
                <S.MenuItem key={route.href}>
                  <Link href={route.href}>{route.label}</Link>
                </S.MenuItem>
              ))}
            </S.Menu>
          </S.Wrapper>
        </Portal>
      )}
    </>
  );
};
