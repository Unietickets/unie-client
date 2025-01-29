import React, { forwardRef } from 'react';

// import { Loader } from '@core';

import * as S from './Button.styles';

export const Button = forwardRef((props, ref) => {
  const { isLoading = false } = props;

  return (
    <S.StyledButton
      {...props}
      ref={ref}
    >
      {isLoading && (
        <S.LoaderContainer>
          {/* <Loader
            width="100%"
            height="100%"
          /> */}
          Loading...
        </S.LoaderContainer>
      )}
      <S.ChildContainer isLoading={isLoading}>{props.children}</S.ChildContainer>
    </S.StyledButton>
  );
});

Button.displayName = 'Button';