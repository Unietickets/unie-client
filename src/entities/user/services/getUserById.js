import { userRepository } from "../repositories/user"

export const getUserById = ({ id }) => {
    return userRepository.getUserById({ id });
}
