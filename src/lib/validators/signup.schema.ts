import { z } from "zod";

export const SignupSchema = z.object({
  email: z.email().min(5).max(32),
  password: z.string().min(5).max(100),
  username: z.string().min(5).max(100),
});

export type SignupInput = z.infer<typeof SignupSchema>;
