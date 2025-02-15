import { prisma } from "@/shared/lib/db";

async function getUserById({ id }) {
  return await prisma.user.findUnique({
    where: {
      id,
    }
  });
}

async function getUserByEmail({ email }) {
  return await prisma.user.findUnique({
    where: {
      email,
    }
  });
}

async function createUser({ email, hashedPassword, name }) {
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    }
  });
}

export const userRepository = { getUserByEmail, getUserById, createUser };
