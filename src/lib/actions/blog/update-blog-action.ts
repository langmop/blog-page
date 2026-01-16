"use server";

import { BlogStatus } from "@/generated/prisma/enums";
import { requireAuth } from "@/lib/core/auth/requireAuth";
import { prisma } from "../../../../lib/db";

import { CreateBlog } from "@/lib/validators/blog.schema";

export default async function updateBlog({
  content,
  slug,
  status,
  title,
  id,
  state
}: CreateBlog & {
  id: number;
}) {
  try {
    const user = await requireAuth();
    const blog = await prisma.blog.update({
      where: {
        id,
        authorId: user?.id,
      },
      data: {
        content,
        slug,
        title,
        status,
        isEnabled: state,
        authorId: user?.id,
      },
    });
    return {
      status: "SUCCESS",
      blog,
    };
  } catch (err) {
    return {
      status: "FAIL",
      reason: (err as any)?.message ?? "",
    };
  }
}
