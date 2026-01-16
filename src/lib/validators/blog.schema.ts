import { z } from "zod";
import { BlogStatus } from "@/generated/prisma/enums";

export const CreateBlogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  status: z.enum(BlogStatus),
  slug: z.string().min(1),
  state: z.boolean().optional()
});

export type CreateBlog = z.infer<typeof CreateBlogSchema>;
