import { forwardRef } from 'react';

import * as S from './Input.styles';

export const Input = forwardRef((props, ref) => (
  <S.Input
    {...props}
    ref={ref}
  />
));

Input.displayName = 'Input';
