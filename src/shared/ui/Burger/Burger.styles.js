'use client'

import styled from "styled-components";

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
  max-width: 500px;
  height: 100%;
  padding-top: 32px;
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
  width: 80%;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MenuItem = styled.li`
  list-style: none;

  display: flex;
  align-items: center;
  gap: 8px;

  ${getTypographyStyles(TYPOGRAPHY.body)};
`;

export const Caption = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;

  font-weight: 500;
  font-size: 10px;
  line-height: 14px;

  color: ${({ theme }) => theme.text.secondary};

  &::after {
    content: '';

    display: block;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.border};
  }
`;
