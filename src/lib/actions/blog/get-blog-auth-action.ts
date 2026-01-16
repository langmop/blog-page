import { requireAuth } from "@/lib/core/auth/requireAuth";
import { prisma } from "../../../../lib/db";

export default async function getBlogData(id: number) {
  try {
    const user = await requireAuth();

    const blogData = await prisma.blog.findUnique({
      where: {
        id,
        authorId: user.id,
      },
    });

    return {
      status: "success",
      blogData,
    };
  } catch (err) {
    return {
      status: "error",
      message: (err as any)?.message,
    };
  }
}
