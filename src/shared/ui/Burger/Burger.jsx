"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { ROUTES } from "@core/routes";

import { Portal } from "../Portal";
import { Menu } from "../Icons";

import * as S from "./Burger.styles";

const routes = Object.values(ROUTES);

export const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null)

  const handleClickOutside = () => {
    setIsOpen(false);
  }

  useOnClickOutside(ref, handleClickOutside);

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
