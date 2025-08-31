import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Неверный формат email"),
  password: z.string().min(3, "Пароль должен содержать минимум 3 символа"),
});

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email"),
    name: z.string().min(2, "Name must contain at least 2 symbols"),
    password: z.string().min(3, "Password must contain at least 3 symbols"), // TODO увеличить до публикации mvp до корректных значений
    passwordConfirm: z.string()
  })
  .refine((data) => {
    console.log("data", data)
    const passwordConfirmed = data.password === data.passwordConfirm;

    return passwordConfirmed;
  }, {
    message: "Password doesn't match",
    path: ['password'],
  });
