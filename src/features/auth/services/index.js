import { userService } from "@entities/user";

class AuthService {
  register = async ({ email, password, name }) => {
    return await userService.createUser({ email, password, name });
  };
};

export const authService = new AuthService();
