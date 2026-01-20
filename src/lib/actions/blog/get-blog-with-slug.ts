"use server";

import { prisma } from "../../../../lib/db";

export async function getBlogWithSlug(slug: string) {
  try {
    const blogDetails = await prisma?.blog?.findUnique({
      where: {
        slug,
      },
      select: {
        currentVersion: true
      }
    });

    return {
      status: "success",
      data: blogDetails,
    };
  } catch (err) {
    return {
      status: "failed",
      message: (err as any)?.message,
    };
  }
}
