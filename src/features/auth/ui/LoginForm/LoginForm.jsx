"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input, ErrorCaption } from "@shared/ui";
import { useValidation } from "@/shared/lib";
import { ROUTES } from "@core/routes";

import { loginSchema } from "./LoginForm.validation";
import * as S from "./LoginForm.styles";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errors, validate } = useValidation(loginSchema);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate({ email, password })) {
      return;
    }

    const signInResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResponse?.error) {
      console.error("Ошибка входа:", signInResponse.error);
      alert("Ошибка входа:", signInResponse.error);
    } else {
      localStorage.setItem('userEmail', email);
      router.push("/");
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Info>
        <S.Title>Login form</S.Title>
        <S.SubTitle>Fill out all the fields and join our community</S.SubTitle>
      </S.Info>

      {(errors.email || errors.password) && (
        <S.ErrorBlock>
          <ErrorCaption>
            Incorrect email or password
          </ErrorCaption>
        </S.ErrorBlock>
      )}

      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        hasError={Boolean(errors?.email)}
      />

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        hasError={Boolean(errors?.password)}
      />

      <S.Button variant="primary" size="medium" isRounded type="submit" fullWidth={false}>
        Login
      </S.Button>

      <S.Caption>
        Don't have an account?&nbsp;
        <S.MyLink href={ROUTES.signUp.href}>Sign up</S.MyLink>
      </S.Caption>
    </S.Form>
  );
}
