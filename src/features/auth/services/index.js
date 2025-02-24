'use server';

import * as userService from "@entities/user/services";

export const register = async ({ email, password, name }) => {
  return await userService.createUser({ email, password, name });
};
