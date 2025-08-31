"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useValidation } from "@/shared/lib";
import { Input, Button as BaseButton, InputWithEye, ErrorCaption } from "@shared/ui";
import { ROUTES } from "@core/routes";
import * as userService from "@entities/user/services";

import { AuthViaServices } from "../AuthViaServices";

import * as S from "./Auth.styles";
import { loginSchema, registerSchema } from "./Auth.validation";

export function Auth() {
  const router = useRouter();

  const {
    errors: loginErrors,
    validate: validateLogin,
    addErrors: addLoginErrors
  } = useValidation(loginSchema);
  const {
    errors: registerErrors,
    validate: validateRegister,
    addErrors: addRegisterErrors
  } = useValidation(registerSchema);

  const [authType, setAuthType] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const hasLoginError = loginErrors.email || loginErrors.password || loginErrors.general;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await userService.getUserByEmail(email);
    console.log(user)

    if (!authType) {
      // Если пользователь найден
      // Отображаем поле ввода пароля
      if (user) {
        setAuthType("login");
      } else {
        // Если пользователь не нашелся
        // Отображаем поля для регистрации
        setAuthType("register");
      }
    } else { // Если определен тип аутентификации

      if (authType === "login") {
        handleLogin();
      } else {
        handleRegister();
      }
    }
  };

  const handleLogin = async () => {
    if (!validateLogin({ email, password })) {
      return;
    }

    const signInResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResponse?.error) {
      console.error("Ошибка входа:", signInResponse.error);
      addLoginErrors({ general: signInResponse.error });
    } else {
      localStorage.setItem('userEmail', email);
      router.push("/");
    }
  }

  const handleRegister = async () => {
    if (!validateRegister({ email, password, passwordConfirm, name: fullName })) {
      return;
    }

    try {
      await userService.createUser({ email, password, name: fullName });
    } catch(e) {
      console.warn("Ошибка регистрации:", e);
      addRegisterErrors(e);
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    localStorage.setItem('userEmail', email);
    router.push("/");
  }

  console.log(registerErrors)

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Info>
        <S.Title>Login form</S.Title>
        <S.SubTitle>Fill out all the fields and join our community</S.SubTitle>
      </S.Info>

      {authType === "login" && (hasLoginError) && (
        <S.ErrorBlock>
          <ErrorCaption>
            Incorrect email or password
          </ErrorCaption>
        </S.ErrorBlock>
      )}

      {authType === "register" && ['email', 'name'].map((field) => registerErrors[field] && (
        <S.ErrorBlock key={field}>
          <ErrorCaption>
            {registerErrors[field]}
          </ErrorCaption>
        </S.ErrorBlock>
      ))}

      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        hasError={hasLoginError || registerErrors.email}
      />

      {authType === "login" && (
        <InputWithEye
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          hasError={hasLoginError}
        />
      )}

      {authType === "register" && (
        <>
          <Input
            type="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name*"
            required
            hasError={registerErrors.name}
          />

          <InputWithEye
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password*"
            required
            hasError={registerErrors.password}
          />

          <InputWithEye
            id="password-confirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm password*"
            required
            hasError={registerErrors.password}
          />

          {['password'].map((field) => registerErrors[field] && (
            <S.ErrorBlock key={field}>
              <ErrorCaption>
                {registerErrors[field]}
              </ErrorCaption>
            </S.ErrorBlock>
          ))}
        </>
      )}

      <BaseButton variant="primary" size="medium" isRounded type="submit" fullWidth={false}>
        Continue
      </BaseButton>

      {(authType === "login" || authType === null) && (
        <>
          <p>------------------ or ------------------</p>

          <AuthViaServices />

          <S.Caption>
            Don't have an account?&nbsp;
            <S.MyLink href={ROUTES.signUp.href}>Sign up</S.MyLink>
          </S.Caption>
        </>
      )}

      {authType === "register" && (
        <S.Caption>
          By proceeding, you confirm that you are 18 or older and agree to our
          {" "}
          <S.MyLink href={ROUTES.termsAndConditions.href}>terms and conditions</S.MyLink>
        </S.Caption>
      )}
    </S.Form>
  );
}
