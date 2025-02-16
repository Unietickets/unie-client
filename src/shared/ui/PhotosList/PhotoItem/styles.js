'use client'

import styled from "styled-components";

import { getTypographyStyles, TYPOGRAPHY } from "@/shared/lib";
import { Colors } from "@/shared/constants";

import { Button } from "../../Button";

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

export const ImageWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  border-radius: 8px;

  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
`;

export const DeleteButton = styled(Button)`
  position: absolute;
  top: 4px;
  right: 4px;
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const ImageLabel = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;

  width: 10px;
  height: 10px;
  border-radius: 50%;

  background-color: ${Colors.UltimateOrange};

  ${({ label }) => label === 'uploaded' && `
    background-color: ${Colors.PalmTree};
  `}
`;
