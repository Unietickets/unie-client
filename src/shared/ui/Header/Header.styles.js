'use client'

import styled from "styled-components";

import { TYPOGRAPHY, getTypographyStyles } from "@shared/lib";

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
  margin-bottom: 48px;
`;

export const LogoText = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.h2)};
`;

export const SideItem = styled.div`
  width: 32px;
`;
