import { z } from "zod";

export const myPageSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: "nickname는 1글자 이상이어야 합니다." })
    .max(20, { message: "nickname는 20글자 이하이어야 합니다" }),
});
