import { userRepository } from "../repositories/user"

export const getUserByEmail = ({ email }) => {
  return userRepository.getUserByEmail({ email });
}
