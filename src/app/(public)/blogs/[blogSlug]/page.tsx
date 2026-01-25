import { getBlogWithSlug } from "@/lib/actions/blog/get-blog-with-slug";
import Markdown from 'react-markdown'
import TextSelection from "./text-selection";


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
    <div className="m-3">
      <div className="text-4xl">{data?.currentVersion?.title}</div>
      <div><Markdown>{data?.currentVersion?.content}</Markdown></div>
      <TextSelection />
    </div>
  );
}

export default BlogPage;
