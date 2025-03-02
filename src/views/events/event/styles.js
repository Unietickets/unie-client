'use client';

import styled from 'styled-components';

import { Colors } from '@/shared/constants';
import { getTypographyStyles, TYPOGRAPHY } from '@/shared/lib';

export const TicketRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px;
  border-radius: 8px;

  /* background: ({ theme }) => theme.background.secondary; */
  background: ${Colors.Carbon};
`;

export const Caption = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body2)};
  font-size: 12px;
  color: ${Colors.White};
`;
