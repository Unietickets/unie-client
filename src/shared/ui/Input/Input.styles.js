'use client'

import styled from 'styled-components';

import { TYPOGRAPHY, getTypographyStyles } from '@shared/lib';
import { Colors } from '@shared/constants';

export const Input = styled.input`
  width: 100%;
  padding: var(--input-padding, 8px 16px);

  ${getTypographyStyles(TYPOGRAPHY.caption2)};
  color: var(--input-text-color, ${Colors.Mako});

  outline: var(--input-outline, none);
  box-shadow: var(--input-box-shadow, none);
  border-radius: 40px;
  border: 1px solid ${Colors.TitaniumWhite};
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
    --input-text-color: ${Colors.Palladium};
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
