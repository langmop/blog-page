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

    return await prisma.$transaction(async (tx) => {
      // 1️⃣ Create blog first (currentVersionId nullable)
      const blog = await tx.blog.create({
        data: {
          slug,
          status,
          authorId: user.id,
        },
      });

      // 2️⃣ Create first version
      const blogVersion = await tx.blogVersion.create({
        data: {
          content,
          title,
          versionNumber: 1,
          blogId: blog.id,
        },
      });

      // 3️⃣ Update blog to set currentVersionId
      await tx.blog.update({
        where: { id: blog.id },
        data: {
          currentVersionId: blogVersion.id,
        },
      });

      return {
        status: "SUCCESS",
        blog,
        currentVersion: blogVersion,
      };
    });
  } catch (err) {
    console.error(err);
    return {
      status: "FAIL",
      reason: (err as any)?.message ?? "",
    };
  }
}
