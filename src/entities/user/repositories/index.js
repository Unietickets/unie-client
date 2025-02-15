import { prisma } from "@/shared/lib/db";

class UserRepository {
  async getUserById(id) {
    return await prisma.user.findUnique({
      where: {
        id,
      }
    });
  }

  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      }
    });
  }

  async createUser({ email, hashedPassword, name }) {
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      }
    });
  }
}

export const userRepository = new UserRepository();
