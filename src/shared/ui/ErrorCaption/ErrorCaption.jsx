import React from 'react';

import { CrossIcon } from '../Icons';

import * as S from './styles';

export const ErrorCaption = ({ children }) => {
  return (
    <S.Wrapper>
      <CrossIcon />
      <S.Caption>
        {children}
      </S.Caption>
    </S.Wrapper>
  );
};