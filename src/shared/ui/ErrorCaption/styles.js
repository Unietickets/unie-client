'use client'

import { Colors } from "@/shared/constants";
import { getTypographyStyles, TYPOGRAPHY } from "@/shared/lib";
import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Caption = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body2)};
  color: ${Colors.SmokedSalmon};
`;
