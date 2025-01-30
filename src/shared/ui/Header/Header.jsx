'use client'

import Link from "next/link";

import { ROUTES } from "@core/routes";

import { Burger } from "../Burger";

import * as S from "./Header.styles";

export const Header = () => {
  return (
    <S.Wrapper>
      <S.SideItem>
        <nav>
          {/* <ul className="flex space-x-4">
            {routes.map((route) => (
              <li key={route.href}>
                <Link href={route.href} className="text-white hover:text-gray-300">
                  {route.label}
                </Link>
              </li>
            ))}
          </ul> */}
          <Burger />
        </nav>
      </S.SideItem>
      <S.LogoText>UnieTicket</S.LogoText>
      <S.SideItem>
        <Link href={ROUTES.profile.href}>
          <img src="/images/logo.png" alt="Логотип" />
        </Link>
      </S.SideItem>
    </S.Wrapper>
  );
};
