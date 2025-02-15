'use client';

import { Input } from '@/shared/ui';
import { ROUTES } from '@core/routes';

import * as S from './RegisterForm.styles';
import { useActionState } from 'react';

import { createUserAction } from './action';

const initialState = {
  name: '',
  email: '',
  password: '',
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(createUserAction, initialState);

  return (
    <S.Form
      action={formAction}
    >
      <S.Info>
        <S.Title>Register form</S.Title>
        <S.SubTitle>Fill out all the fields and join our community</S.SubTitle>
      </S.Info>

      <Input
        type="email"
        placeholder="Email"
        name="email"
        required
      />

      <Input
        type="text"
        placeholder="Name"
        name="name"
        required
      />

      <Input
        type="password"
        placeholder="Password"
        name="password"
        required
      />

      <S.Button
        variant='primary'
        size='medium'
        isRounded
        type="submit"
        fullWidth={false}
        disabled={pending}
      >
        Register
      </S.Button>

      <S.Caption>
        Already have an account?&nbsp;
        <S.MyLink
          href={ROUTES.signIn.href}
        >
          Sign in
        </S.MyLink>
      </S.Caption>
    </S.Form>
  );
}
