'use client'

import styled from 'styled-components';

import { getTypographyStyles, TYPOGRAPHY } from '@/shared/lib';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body)};
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.primary};
`;
