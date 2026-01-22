"use server";

import { BlogStatus } from "@/generated/prisma/enums";
import { prisma } from "../../../../lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function publishCurrentVersion({
  blogId,
  versionId,
}: {
  versionId: number;
  blogId: number;
}) {
  const passedVersionBlog = await prisma?.blogVersion?.findUnique({
    where: {
      id: versionId,
    },
  });

  if (passedVersionBlog) {
    await prisma?.blog?.update({
      where: {
        id: blogId,
      },
      data: {
        currentVersionId: passedVersionBlog?.id,
        status: BlogStatus.PUBLISHED,
      },
    });
    redirect(`/admin/blog/${blogId}/version/${versionId}`);
  } else {
    const { reason } = await (
      await fetch("https://naas.isalman.dev/no")
    ).json();

    return {
      status: "failed",
      reason,
    };
  }
}

export async function draftCurrentVersion({
  blogId,
  versionId,
}: {
  versionId: number;
  blogId: number;
}) {
  const passedVersionBlog = await prisma?.blogVersion?.findUnique({
    where: {
      id: versionId,
    },
  });

  if (passedVersionBlog) {
    await prisma?.blog?.update({
      where: {
        id: blogId,
      },
      data: {
        currentVersionId: passedVersionBlog?.id,
        status: BlogStatus.DRAFT,
      },
    });
    revalidatePath(`/admin/blog/${blogId}/version/${versionId}`)
    // redirect(`/admin/blog/${blogId}/version/${versionId}`);
  } else {
    const { reason } = await (
      await fetch("https://naas.isalman.dev/no")
    ).json();

    return {
      status: "failed",
      reason,
    };
  }
}
