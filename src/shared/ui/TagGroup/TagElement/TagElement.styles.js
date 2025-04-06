'use client'

import styled, { css } from 'styled-components';

import { getTypographyStyles, TYPOGRAPHY } from '@/shared/lib';
import { Colors } from '@/shared/constants';

import { Button } from '../../Button';
import { TAG_VARIANTS } from '../constants';

const defaultStylesMixin = css`
  border-color: ${Colors.FluorescentOrange};
  background-color: ${Colors.Transparent};
  color: ${Colors.White};

  cursor: pointer;
`;

const NoteStylesMixin = css`
  border-color: ${Colors.FluorescentOrange};
  background-color: ${Colors.FluorescentOrange};
  color: ${Colors.Black};

  cursor: default;
`;

export const TagListElement = styled.li`
  list-style: none;

  padding: 0;
`;

export const TagContent = styled(Button)`
  border-radius: 100px;
  border: 1px solid;


  ${getTypographyStyles(TYPOGRAPHY.body2)};
  text-align: center;

  ${({ variant }) => {
    if (variant === TAG_VARIANTS.DEFAULT) {
      return defaultStylesMixin;
    }
    if (variant === TAG_VARIANTS.NOTE) {
      return NoteStylesMixin;
    }
  }}

  ${({ isActive }) =>
    isActive &&
    `
      background-color: ${Colors.FluorescentOrange};
      color: ${Colors.Black};
      cursor: default;
    `}

  ${({ isAccent }) =>
    isAccent &&
    `
      background-color: ${Colors.CarrotOrange};
      border-color: ${Colors.CarrotOrange};
      cursor: default;
    `}
`;
