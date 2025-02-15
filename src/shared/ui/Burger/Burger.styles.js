'use client'

import styled from "styled-components";

import { Colors } from "@shared/constants";

import { TYPOGRAPHY, getTypographyStyles } from "@shared/lib";

export const Wrapper = styled.nav`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 70%;
  min-width: 270px;
  height: 100%;
  padding-top: 84px;
  padding-left: 28px;

  backdrop-filter: blur(26px);
  background: rgba(103, 103, 103, .1);
  border-right: 1px solid ${({ theme }) => theme.border};
  border-radius: 0 16px 16px 0;

  z-index: 10;
`;

export const TextLogo = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.h2)};
`;

export const Menu = styled.ul`
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MenuItem = styled.li`
  list-style: none;

  ${getTypographyStyles(TYPOGRAPHY.body)};
`;
