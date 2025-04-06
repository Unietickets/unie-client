'use server'

import { ROUTES } from "@/core/routes";

import * as authService from "../../services";

export async function createUserAction(_, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const passwordRepeat = formData.get('passwordRepeat');
  const name = formData.get('name');
  const acceptTermsAndConditions = formData.get('accept-terms-and-conditions');

  const data = {
    email,
    password,
    passwordRepeat,
    name,
    acceptTermsAndConditions
  }

  if (!acceptTermsAndConditions) {
    return { message: 'Please accept the terms and conditions', data }
  }

  const res = await authService.register({ email, password, name });

  if (!res.ok) {
    return { message: 'Please enter a valid email', data }
  }

  redirect(ROUTES.signIn.href);
}
