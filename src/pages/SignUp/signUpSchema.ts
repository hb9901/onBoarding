import { z } from "zod";

export const signUpSchema = z.object({
  id: z
    .string()
    .min(4, { message: "아이디는 4글자 이상이어야 합니다." })
    .max(20, { message: "아이디는 20글자 이하이어야 합니다" }),
  password: z
    .string()
    .min(4, { message: "비밀번호는 4글자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20글자 이하이어야 합니다" }),
  nickname: z
    .string()
    .min(1, { message: "닉네임은 1글자 이상이어야 합니다." })
    .max(20, { message: "닉네임은 20글자 이하이어야 합니다" }),
});
