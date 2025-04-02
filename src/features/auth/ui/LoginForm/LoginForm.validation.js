import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Неверный формат email"),
  password: z.string().min(3, "Пароль должен содержать минимум 3 символа"),
});