import { fetchBlogPublic } from "@/lib/actions/blog/fetch-blog-public-action";
import Link from "next/link";
import React from "react";

async function BlogsListing() {
  const { status, blogs, message } = await fetchBlogPublic();
  return status === "failed" ? (
    <div>{message}</div>
  ) : (
    <div className="m-3">
      <h2 className="text-4xl">Tech Blogs</h2>
      <h3 className="text-3xl">check out my new blogs here weekly</h3>
      {!blogs?.length && <div>Sorry No blogs right now, come back later</div>}
      <div className="flex flex-col mt-3">
        {blogs?.map(({ slug, currentVersion }) => (
          <Link className="text-2xl hover:text-blue-400" href={`/blogs/${slug}`}>{currentVersion?.title ?? ""}</Link>
        ))}
      </div>
    </div>
  );
}

export default BlogsListing;
