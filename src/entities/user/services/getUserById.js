import { userRepository } from "../repositories/user"

export const getUserById = ({ id }) => {
    return userRepository.getUser({ id });
}