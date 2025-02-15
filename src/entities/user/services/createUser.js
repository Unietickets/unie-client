import { userRepository } from "../repositories/user";
import bcrypt from 'bcryptjs';

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
