import getBlogData from "@/lib/actions/blog/get-blog-auth-action";
import React from "react";
import EditBlog from "./edit-blog";

async function UpdateBlog({
  params,
}: {
  params: Promise<{
    blogId: string;
  }>;
}) {
  const { blogId } = await params;

  const { status, blogData, message } = await getBlogData(+blogId);
  const { content, slug, title, status: blogStatus, id, isEnabled } = blogData!;

  return status !== "success" ? (
    <div>No Data found, {message}</div>
  ) : (
    <EditBlog
      blogId={id}
      content={content}
      slug={slug}
      status={blogStatus}
      title={title}
      state={isEnabled}
    />
  );
}

export default UpdateBlog;
