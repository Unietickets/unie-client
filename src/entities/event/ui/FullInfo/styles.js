'use client'

import Image from "next/image";
import styled from "styled-components";

import { getTypographyStyles, TYPOGRAPHY } from "@/shared/lib";
import { Colors } from "@/shared/constants";

const BORDER_RADIUS = '15px';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledEventCard = styled.div`
  position: relative;

  overflow: hidden;

  width: 100%;

  border-radius: ${BORDER_RADIUS};

  transition: transform 0.2s ease-in-out;
`;

export const ImageWrapper = styled.div`
  width: 100%;
`;

export const EventImage = styled(Image)`
  position: static !important;

  width: 100%;
  object-fit: cover;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  width: 100%;
`;

export const Title = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.h2)};

  color: ${({ theme }) => theme.text.primary};
`;

export const Description = styled.span`
  width: 100%;
  padding: 16px;
  border-radius: 15px;

  ${getTypographyStyles(TYPOGRAPHY.body)};
  color: ${Colors.White};

  background: radial-gradient(103.34% 264.56% at 108.28% 140.47%, #E7D985 0%, #3E3E3E 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
  linear-gradient(0deg, rgba(57, 57, 57, 0.8), rgba(57, 57, 57, 0.8)),
  radial-gradient(242.79% 373.21% at -53.05% 242.79%, rgba(80, 255, 246, 0) 0%, rgba(0, 0, 0, 0.2) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

`;
