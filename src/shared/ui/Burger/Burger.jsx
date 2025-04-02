"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import { AUTHORIZED_ROUTES, PUBLIC_ROUTES, ROUTES } from "@core/routes";
import { useOutsideClick } from "@shared/lib";

import { MenuIcon } from "../Icons";
import { Portal } from "../Portal";

import * as S from "./Burger.styles";
import { cutHelpPages } from "./helpers";

export const Burger = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const routes = useMemo(() => {
    if (status === "authenticated") {
      return AUTHORIZED_ROUTES;
    }

    return cutHelpPages(PUBLIC_ROUTES);
  }, [status]);

  const handleClose = () => {
    setIsOpen(false);
  }

  const ref = useOutsideClick(handleClose);

  return (
    <>
      <MenuIcon onClick={() => setIsOpen((prev) => !prev)} />
      {isOpen && (
        <Portal>
          <S.Wrapper ref={ref}>
            <S.TextLogo onClick={() => setIsOpen((prev) => !prev)}>UnieTicket</S.TextLogo>
              <S.Menu>
                <S.Caption>
                  Navigation
                </S.Caption>
                {routes.map((route) => (
                  <S.MenuItem key={route.href}>
                    {route.Icon && <route.Icon />}
                    <Link
                      href={route.href}
                      onClick={handleClose}
                    >
                      {route.label}
                    </Link>
                  </S.MenuItem>
                ))}
              </S.Menu>
              <S.Menu>
                <S.Caption>
                  Help
                </S.Caption>
                {[ROUTES.FAQ, ROUTES.support].map((page) => (
                  <S.MenuItem key={page.href}>
                    {page.Icon && <page.Icon />}
                    <Link
                      href={page.href}
                      onClick={handleClose}
                    >
                      {page.label}
                    </Link>
                  </S.MenuItem>
                ))}
              </S.Menu>
          </S.Wrapper>
        </Portal>
      )}
    </>
  )
};
