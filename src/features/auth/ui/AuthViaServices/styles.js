import styled from "styled-components";

import { getTypographyStyles, TYPOGRAPHY } from "@/shared/lib";
import { Colors } from "@/shared/constants";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
`;

export const TextContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
`;

export const Text = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.TextS)};
  color: ${Colors.Nero};
`;
