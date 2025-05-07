'use server';

import { prisma } from "@/shared/lib/db";

export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: {
      id,
    }
  });
}

export async function  getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email,
    }
  });
}

export async function  createUser({ email, hashedPassword, name }) {
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    }
  });
}

export async function getUserBalance(id) {
  return await prisma.userBalance.findFirst({
    where: {
      user_id: id,
    }
  });
}
