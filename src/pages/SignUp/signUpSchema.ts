import { z } from "zod";

export const signUpSchema = z.object({
  id: z
    .string()
    .min(4, { message: "id는 4글자 이상이어야 합니다." })
    .max(20, { message: "id는 20글자 이하이어야 합니다" }),
  password: z
    .string()
    .min(4, { message: "password는 4글자 이상이어야 합니다." })
    .max(20, { message: "password는 20글자 이하이어야 합니다" }),
  nickname: z
    .string()
    .min(1, { message: "nickname는 4글자 이상이어야 합니다." })
    .max(20, { message: "password는 20글자 이하이어야 합니다" }),
});
