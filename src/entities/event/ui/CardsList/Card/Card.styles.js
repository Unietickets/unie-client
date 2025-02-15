'use client'

import styled from 'styled-components';
import Image from 'next/image';

import { Colors } from '@shared/constants';
import { getTypographyStyles, TYPOGRAPHY } from '@shared/lib';

const BORDER_RADIUS = '15px';

export const StyledEventCard = styled.div`
  position: relative;

  overflow: hidden;

  height: 130px;
  width: 200px;
  margin-top: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.surface};

  border-radius: ${BORDER_RADIUS};

  transition: transform 0.2s ease-in-out;

  // Рамка с градиентом и радиусом
  &::before {
    content: '';

    position: absolute;
    inset: 0;

    padding: 1px;
    background: linear-gradient(74deg, ${Colors.SanAntonioSage} -0.44%, ${Colors.SuperSilver} 132%);
    mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    border-radius: ${BORDER_RADIUS};
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

export const MetadataWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;

  display: flex;
  gap: 8px;
`;

export const MetadataItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 8px;
  border-radius: 30px;

  background: ${({ accent, theme }) => {
    if (accent) return theme.secondary;

    return theme.primary;
  }};
`;

export const MetadataItemText = styled.span`
  font-size: 8px;
  font-weight: 600;
  line-height: 12px;

  color: ${Colors.Carbon};
`;

export const ImageWrapper = styled.div`
  width: 100%;
`;

export const EventImage = styled(Image)`
  position: static !important;

  height: 130px !important;
  width: 100%;
  object-fit: cover;
`;

export const ContentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;
  padding: 8px;

  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
`;

export const Title = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body2)};
  color: ${Colors.White};
`;

export const Venue = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body2)};
  color: ${Colors.Paternoster};
`;
