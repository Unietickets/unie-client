'use server'

import { ROUTES } from "@/core/routes";

import * as authService from "../../services";

export async function createUserAction(_, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');
  const acceptTermsAndConditions = formData.get('accept-terms-and-conditions');

  if (!acceptTermsAndConditions) {
    return { message: 'Please accept the terms and conditions' }
  }

  const res = await authService.register({ email, password, name });

  if (!res.ok) {
    return { message: 'Please enter a valid email' }
  }

  redirect(ROUTES.signIn.href);
}
