"use server";

import { requireAuth } from "@/lib/core/auth/requireAuth";
import { prisma } from "../../../../lib/db";

import { CreateBlog } from "@/lib/validators/blog.schema";

export default async function updateBlog({
  content,
  slug,
  status,
  title,
  id,
  state,
}: CreateBlog & {
  id: number;
}) {
  try {
    const user = await requireAuth();

    return await prisma.$transaction(async (tx) => {
      const blog = await tx.blog.update({
        where: {
          id,
          authorId: user?.id,
        },
        data: {
          slug,
          status,
          isEnabled: state,
          authorId: user?.id,
        },
        select: {
          versions: true,
          id: true,
        },
      });

      await tx.blogVersion.create({
        data: {
          content,
          title,
          versionNumber: blog?.versions?.length + 1,
          blogId: blog.id,
        },
      });

      return {
        status: "SUCCESS",
        blog,
        reason: ''
      };
    });
  } catch (err) {
    return {
      status: "FAIL",
      reason: (err as any)?.message ?? "",
    };
  }
}
