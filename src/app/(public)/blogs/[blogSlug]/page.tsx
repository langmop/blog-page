import { getBlogWithSlug } from "@/lib/actions/blog/get-blog-with-slug";
import markdownToTxt from 'markdown-to-txt';
import Markdown from 'react-markdown'


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
    </div>
  );
}

export default BlogPage;
