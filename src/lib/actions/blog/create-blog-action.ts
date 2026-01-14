"use server";

import { BlogStatus } from "@/generated/prisma/enums";
import { requireAuth } from "@/lib/core/auth/requireAuth";
import { prisma } from "../../../../lib/db";

interface ICreateBlog {
  title: string;
  slug: string;
  content: string;
  status: BlogStatus;
}

export default async function createBlog({
  content,
  slug,
  status,
  title,
}: ICreateBlog) {
  try {
    const user = await requireAuth();
    const blog = await prisma.blog.create({
      data: {
        content,
        slug,
        title,
        status,
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
