import { z } from "zod";

export const SigninSchema = z.object({
  password: z.string().min(5).max(100),
  username: z.string().min(5).max(100),
});

export type SigninInput = z.infer<typeof SigninSchema>;
