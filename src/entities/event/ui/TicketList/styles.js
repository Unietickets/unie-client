'use client'

import { Colors } from "@/shared/constants";
import { getTypographyStyles, TYPOGRAPHY } from "@/shared/lib";
import { Button } from "@/shared/ui";
import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Header = styled.span`
  width: 100%;
  text-align: center;

  ${getTypographyStyles(TYPOGRAPHY.h2)};
`;

export const TicketList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 100%;
  padding: 8px;

  border: 1px solid ${Colors.White};
  border-radius: 15px;
`;

export const TicketItem = styled.li`
  width: 100%;
`;

export const Ticket = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  border-radius: 15px;
  padding: 16px 10px;

  background: radial-gradient(103.34% 264.56% at 108.28% 140.47%, #E7D985 0%, #3E3E3E 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
  linear-gradient(0deg, rgba(57, 57, 57, 0.8), rgba(57, 57, 57, 0.8)),
  radial-gradient(242.79% 373.21% at -53.05% 242.79%, rgba(80, 255, 246, 0) 0%, rgba(0, 0, 0, 0.2) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
`;
