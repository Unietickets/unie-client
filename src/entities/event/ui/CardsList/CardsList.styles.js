'use client'

import styled from "styled-components";

import { TYPOGRAPHY, getTypographyStyles } from "@shared/lib";

export const Title = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.h2)};
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 8px;

  margin-top: 24px;
  ${({ horizontalPadding }) => horizontalPadding && `
    padding: 0 ${horizontalPadding}px;
  `};

  /* Hide scrollbar while maintaining scroll functionality */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`;

export const Card = styled.div`
  flex: 0 0 auto;
`;
