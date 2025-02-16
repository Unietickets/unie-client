'use client'

import styled from "styled-components";
import NextImage from "next/image";

import { getTypographyStyles, TYPOGRAPHY } from "@/shared/lib";

export const ListItem = styled.li`
  list-style: none;
`;

export const Title = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body)};
  color: ${({ theme }) => theme.text.primary};
`;

export const SubTitle = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body2)};
  color: ${({ theme }) => theme.text.primary};
`;

export const Image = styled(NextImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
