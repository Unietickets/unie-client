'use server';

import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';

import * as userRepository from '../repositories';

const addBalanceInfoToUserModel = async (user) => {
  const userBalance = await userRepository.getUserBalance(user.id);

  const userWithBalance = {
    ...user,
    pendingBalance: Number(userBalance?.pending_balance) ?? 0,
    activeBalance: Number(userBalance?.active_balance) ?? 0,
    pendingEdgeDate: userBalance?.activation_date ?? null,
  }

  return userWithBalance;
};

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
  const user = await userRepository.getUserByEmail(email);
  const userWithBalance = await addBalanceInfoToUserModel(user);

  return userWithBalance;
}

export const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  const userWithBalance = await addBalanceInfoToUserModel(user);

  return userWithBalance;
}

export const getUserInfoBySession = async () => {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return null;
  }
  const { user } = session;

  return await getUserByEmail(user.email);
}
