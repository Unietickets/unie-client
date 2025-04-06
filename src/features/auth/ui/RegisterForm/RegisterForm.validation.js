import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email"),
    name: z.string().min(2, "Name must contain at least 2 symbols"),
    password: z.string().min(3, "Password must contain at least 3 symbols"), // TODO увеличить до публикации mvp до корректных значений
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Password doesn't match",
    path: ['passwordRepeat'],
  });
