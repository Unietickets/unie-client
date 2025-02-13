'use server'

import authService from "../../services";

export async function createUserAction(_, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');

  const res = await authService.register({ email, password, name });

  if (!res.ok) {
    return { message: 'Please enter a valid email' }
  }

  redirect('/dashboard')
}
