import userService from "@/entities/user/services";

export const register = async ({ email, password, name }) => {
    const user = await userService.createUser({ email, password, name });

    return user;
}
