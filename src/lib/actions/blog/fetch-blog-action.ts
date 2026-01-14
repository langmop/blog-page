"use server";

import { BlogStatus } from "@/generated/prisma/enums";
import { requireAuth } from "@/lib/core/auth/requireAuth";
import { prisma } from "../../../../lib/db";


interface IBlogListing {
  status?: BlogStatus;
  isEnabled?: boolean;
}

export async function fetchBlogsAdmin(filters: IBlogListing = {}) {
  const user = await requireAuth();

  return prisma.blog.findMany({
    where: {
      authorId: user.id,

      ...(filters.status && { status: filters.status }),
      ...(filters.isEnabled !== undefined && {
        isEnabled: filters.isEnabled,
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
