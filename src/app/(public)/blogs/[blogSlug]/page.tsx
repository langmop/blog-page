import { getBlogWithSlug } from "@/lib/actions/blog/get-blog-with-slug";
import React from "react";

async function BlogPage({
  params,
}: {
  params: Promise<{
    blogSlug: string;
  }>;
}) {
  const { blogSlug } = await params;
  const { status, data } = await getBlogWithSlug(blogSlug);
  return status === "failed" ? (
    <div>Failed to load data</div>
  ) : (
    <div>{data?.currentVersion?.content}</div>
  );
}

export default BlogPage;
