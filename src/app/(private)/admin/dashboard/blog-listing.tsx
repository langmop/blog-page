import { fetchBlogsAdmin } from "@/lib/actions/blog/fetch-blog-action";

export default async function AdminBlogsPage() {
  const blogs = await fetchBlogsAdmin();

  return (
    <div>
      {blogs?.map(({ title, id }) => (
        <div key={id}>{title}</div>
      ))}
    </div>
  );
}
