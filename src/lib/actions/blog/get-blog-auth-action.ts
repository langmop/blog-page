import { requireAuth } from "@/lib/core/auth/requireAuth";
import { prisma } from "../../../../lib/db";

export default async function getBlogData(id: number, versionId: number) {
  try {
    const user = await requireAuth();

    const blogData = await prisma.blog.findUnique({
      where: {
        id,
        authorId: user.id,
      },
      select: {
        isEnabled: true,
        id: true,
        currentVersion: true,
        status: true,
        slug: true,
        versions: true,
        currentVersionId: true,
      },
    });

    const currentVersion = await prisma?.blogVersion?.findFirst({
      where: {
       id: versionId ?? 0
      },
    });

    return {
      status: "success",
      blogData,
      currentVersion,
    };
  } catch (err) {
    return {
      status: "error",
      message: (err as any)?.message,
    };
  }
}
