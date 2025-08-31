'use client'

import styled from 'styled-components';

import { TYPOGRAPHY, getTypographyStyles } from '@shared/lib';
import { Colors } from '@shared/constants';

export const Input = styled.input`
  width: 100%;
  padding: var(--input-padding, 14px 16px);

  ${getTypographyStyles(TYPOGRAPHY.body)};
  color: var(--input-text-color, ${Colors.White});

  outline: var(--input-outline, none);
  box-shadow: var(--input-box-shadow, none);
  border-radius: 15px;
  border: 1px solid ${Colors.Mako};
  background-color: ${Colors.Transparent};

  ${({ withoutBorder }) =>
    withoutBorder &&
    `
      border-color: ${Colors.Transparent};
    `};

  ${({ hasError }) =>
    hasError &&
    `
      & {
        border-color: ${Colors.SmokedSalmon};
      }
    `};

  &::placeholder {
    --input-text-color: ${Colors.DhusarGrey};
    --input-opacity: 0.5;
  }

  &:active:not(:disabled),
  &:focus-within:not(:disabled),
  &:required:active:not(:disabled),
  &:required:focus-within:not(:disabled),
  &:required:invalid:active:not(:disabled),
  &:required:invalid:focus-within:not(:disabled) {
    --input-border-color: ${Colors.FluorescentOrange};
    --input-background-color: ${Colors.White};
  }
`;
