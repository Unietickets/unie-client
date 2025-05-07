'use client'

import styled from 'styled-components';

import { getTypographyStyles, TYPOGRAPHY } from '@/shared/lib';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.h2)};
  margin-bottom: 8px;
  text-align: center;
`;

export const Message = styled.p`
  ${getTypographyStyles(TYPOGRAPHY.body)};
  margin-bottom: 16px;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.primary};
`;

export const TicketInfo = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  
  p {
    ${getTypographyStyles(TYPOGRAPHY.body)};
    margin-bottom: 8px;
    
    &:first-child {
      ${getTypographyStyles(TYPOGRAPHY.subtitle)};
      margin-bottom: 12px;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
