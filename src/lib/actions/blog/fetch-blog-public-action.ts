"use server";

import { BlogStatus } from "@/generated/prisma/enums";
import { prisma } from "../../../../lib/db";

export async function fetchBlogPublic() {
  try {
    const blogs = await prisma?.blog?.findMany({
      where: {
        isEnabled: true,
        status: BlogStatus.PUBLISHED
      },
      select: {
        currentVersion: true,
        slug: true
      }
    });
    return {
      status: "success",
      blogs,
    };
  } catch (err) {
    return {
      status: "failed",
      message: "Failed fetching blogs",
    };
  }
}
