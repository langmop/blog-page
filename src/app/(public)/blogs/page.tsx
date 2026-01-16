import { fetchBlogPublic } from "@/lib/actions/blog/fetch-blog-public-action";
import Link from "next/link";
import React from "react";

async function BlogsListing() {
  const { status, blogs, message } = await fetchBlogPublic();
  return status === "failed" ? (
    <div>{message}</div>
  ) : (
    <div>
      {!blogs?.length && <div>Sorry No blogs right now, come back later</div>}
      {blogs?.map(({ title, slug }) => (
        <Link href={`/blogs/${slug}`}>{title}</Link>
      ))}
    </div>
  );
}

export default BlogsListing;
