import React from 'react';
import { signIn } from 'next-auth/react';

import { AppleIcon, Button, FacebookIcon, GoogleIcon } from '@/shared/ui';

import * as S from './styles';

const ServiceAuthButton = (props) => {
  const { children, onClick } = props;

  return (
    <Button
      variant="secondary"
      size="medium"
      isFullWidth
      isRounded
      onClick={onClick}
    >
      <S.TextContainer>
        {children}
      </S.TextContainer>
    </Button>
  );
}

export const AuthViaServices = () => (
  <S.Wrapper>
    <ServiceAuthButton onClick={() => signIn('apple')}>
      <AppleIcon />
      <S.Text>
        Continue with Apple
      </S.Text>
    </ServiceAuthButton>
    <ServiceAuthButton onClick={() => signIn('google')}>
      <GoogleIcon />
      <S.Text>
        Continue with Google
      </S.Text>
    </ServiceAuthButton>
    <ServiceAuthButton onClick={() => signIn('facebook')}>
      <FacebookIcon />
      <S.Text>
        Continue with Facebook
      </S.Text>
    </ServiceAuthButton>
  </S.Wrapper>
);
