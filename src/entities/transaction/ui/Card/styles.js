'use client'

import styled from "styled-components";

import { getTypographyStyles, TYPOGRAPHY } from "@/shared/lib";
import { Colors } from "@/shared/constants";
import { ArrowIcon } from "@/shared/ui";

const StatusesColors = {
  success: Colors.MediumGreen,
  declined: Colors.Red,
  'in progress': Colors.ZimaBlue,
};

export const HalfBlock = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection};
  gap: ${({ gap }) => gap}px;
`;

export const Title = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body)};
  color: ${Colors.White};
`;

export const Sum = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body)};
  color: ${({ type }) => {
    switch (type) {
      case 'outcome':
        return Colors.Red;
      case 'income':
        return Colors.MediumGreen;
      default:
        return Colors.White;
    }
  }}
`;

export const Arrow = styled(ArrowIcon)`
  transition: transform 0.2s ease-in-out;

  transform: ${({ isOpen }) => isOpen && 'rotate(90deg)'};
`;

export const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DetailCaption = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  color: ${({ accent }) => {
    if (accent) {
      return Colors.FluorescentOrange
    }

    return Colors.Dull;
  }};
`;

export const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  color: ${({ status }) => StatusesColors[status]};

  circle {
    fill: ${({ status }) => StatusesColors[status]};
  }
`;
