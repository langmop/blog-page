import {
  fetchBlogsAdmin,
  IBlogListing,
} from "@/lib/actions/blog/fetch-blog-action";
import Link from "next/link";

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<IBlogListing>;
}) {
  const { isEnabled, status } = await searchParams;

  const blogs = await fetchBlogsAdmin({ isEnabled, status });
  return (
    <div className="flex flex-col">
      {blogs.map(({ id, currentVersionId, currentVersion: {
        title
      } }) => (
        <Link href={`/admin/blog/${id}/version/${currentVersionId}`} key={id}>
          {title}
        </Link>
      ))}
    </div>
  );
}
