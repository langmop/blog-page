"use server";

import { prisma } from "../../../../lib/db";

export async function fetchBlogPublic() {
  try {
    const blogs = await prisma?.blog?.findMany({
      where: {
        isEnabled: true,
        status: "PUBLISHED",
      },
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
