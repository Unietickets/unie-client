import { userRepository } from "../repositories/user";

export const createUser = async ({ email, password, name }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await userRepository.createUser({ email, hashedPassword, name });

        const { password, ...userWithoutPassword } = user;
            
        return { user: userWithoutPassword };
    } catch (e) {
        return e;
    }
}