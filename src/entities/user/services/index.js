'use server';

import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';

import * as userRepository from '../repositories';

export const createUser = async ({ email, password: userPassword, name }) => {
  try {
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const user = await userRepository.createUser({ email, hashedPassword, name });

    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword };
  } catch (e) {
    return e;
  }
}

export const getUserByEmail = async (email) => {
  return userRepository.getUserByEmail(email);
}

export const getUserById = async (id) => {
  return userRepository.getUserById(id);
}

export const getUserInfoBySession = async () => {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return null;
  }
  const { user } = session;

  return await getUserByEmail(user.email);
}
