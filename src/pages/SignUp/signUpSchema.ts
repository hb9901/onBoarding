import { z } from "zod";

export const signUpSchema = z.object({
  id: z
    .string()
    .min(1, { message: "id required" })
    .max(20, { message: "too long" }),
  password: z
    .string()
    .min(1, { message: "password required" })
    .max(20, { message: "too long" }),
  nickname: z
    .string()
    .min(1, { message: "nickname required" })
    .max(20, { message: "too long" }),
});
