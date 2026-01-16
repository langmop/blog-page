import { Suspense } from "react";
import BlogListingClient from "./blog-listing-client";
import AdminBlogsPage from "./blog-listing";
import { IBlogListing } from "@/lib/actions/blog/fetch-blog-action";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<IBlogListing>;
}) {
  return (
    <div>
      Dashboard
      <BlogListingClient />
      <Suspense fallback={<div>Loading</div>}>
        <AdminBlogsPage searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
