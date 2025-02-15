'use client'

import Image from "next/image";
import styled from "styled-components";

import { getTypographyStyles, TYPOGRAPHY } from "@/shared/lib";

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
  ${getTypographyStyles(TYPOGRAPHY.body)};

  color: ${({ theme }) => theme.text.secondary};
`;
