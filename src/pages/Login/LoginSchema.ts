import { z } from "zod";

export const logInSchema = z.object({
  id: z
    .string()
    .min(4, { message: "아이디는 4글자 이상이어야 합니다." })
    .max(20, { message: "아이디는 20글자 이하이어야 합니다" }),
  password: z
    .string()
    .min(4, { message: "패스워드는 4글자 이상이어야 합니다." })
    .max(20, { message: "패스워드는 20글자 이하이어야 합니다" }),
});
