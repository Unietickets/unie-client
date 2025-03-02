'use client'

import styled from 'styled-components';

import { getTypographyStyles, TYPOGRAPHY } from '@/shared/lib';
import { Colors } from '@/shared/constants';

import { Button } from '../../Button';

export const TagListElement = styled.li`
  list-style: none;

  padding: 0;
`;

export const TagContent = styled(Button)`
  border-radius: 100px;
  border: 1px solid;
  border-color: ${Colors.FluorescentOrange};

  background-color: ${Colors.Transparent};

  ${getTypographyStyles(TYPOGRAPHY.body2)};
  color: ${Colors.White};
  text-align: center;

  ${({ isActive }) =>
    isActive &&
    `
      background-color: ${Colors.FluorescentOrange};
      color: ${Colors.Black};
      cursor: default;
    `}
`;
