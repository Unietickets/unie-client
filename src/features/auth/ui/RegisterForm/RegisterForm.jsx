'use client';

import { useActionState, useState, useRef } from 'react';

import { Input, Switch, ErrorCaption } from '@/shared/ui';
import { useValidation } from '@/shared/lib';
import { ROUTES } from '@core/routes';

import { registerSchema } from './RegisterForm.validation';
import { createUserAction } from './action';
import * as S from './RegisterForm.styles';

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordRepeat: '',
}

export function RegisterForm() {
  const formRef = useRef(null);
  const [state, formAction, pending] = useActionState(createUserAction, initialState);
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(true);
  const { errors, validate } = useValidation(registerSchema);

  const validateAndSubmit = (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(formRef.current).entries()
    );

    if (!validate(formData)) {
      return;
    }

    const formDataObj = new FormData(formRef.current);
    formAction(formDataObj);
  };

  return (
    <S.Form ref={formRef} onSubmit={validateAndSubmit}>
      <S.Info>
        <S.Title>Register form</S.Title>
        <S.SubTitle>Fill out all the fields and join our community</S.SubTitle>
      </S.Info>

      {['email', 'name', 'password'].map((field) => errors[field] && (
        <S.ErrorBlock key={field}>
          <ErrorCaption>
            {errors[field]}
          </ErrorCaption>
        </S.ErrorBlock>
      ))}

      <Input
        type="email"
        placeholder="Email"
        name="email"
        required
        hasError={Boolean(errors?.email)}
      />

      <Input
        type="text"
        placeholder="Name"
        name="name"
        required
        hasError={Boolean(errors?.name)}
      />

      <Input
        type="password"
        placeholder="Password"
        name="password"
        required
        hasError={Boolean(errors?.password)}
      />

      <Input
        type="password"
        placeholder="Confirm password"
        name="password-repeat"
        required
        hasError={Boolean(errors?.passwordRepeat)}
      />

      {errors.passwordRepeat && (
        <S.ErrorBlock>
          <ErrorCaption>
            {errors.passwordRepeat}
          </ErrorCaption>
        </S.ErrorBlock>
      )}

      <S.SwitchItem>
        <Switch
          id="accept-terms-and-conditions"
          name="accept-terms-and-conditions"
          checked={acceptTermsAndConditions}
          onChange={(checked) => setAcceptTermsAndConditions(checked)}
        />
        <label htmlFor="accept-terms-and-conditions">
          Accept
          {' '}
          <S.MyLink href={ROUTES.termsAndConditions.href}>
            {ROUTES.termsAndConditions.label}
          </S.MyLink>
        </label>
      </S.SwitchItem>

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
