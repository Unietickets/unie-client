'use client'

import { getTypographyStyles, TYPOGRAPHY } from '@/shared/lib';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, 1fr);
`;

export const Caption = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body2)};
  color: ${({ theme }) => theme.text.secondary};
`;
