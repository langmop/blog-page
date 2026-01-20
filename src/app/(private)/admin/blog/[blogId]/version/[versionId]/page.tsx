import getBlogData from "@/lib/actions/blog/get-blog-auth-action";
import EditBlog from "./edit-blog";
import VersionListing from "./version-listing";

async function UpdateBlog({
  params,
}: {
  params: Promise<{
    blogId: string;
    versionId: string;
  }>;
}) {
  const { blogId, versionId } = await params;

  const { status, blogData, message, currentVersion: currentVersionData } = await getBlogData(+blogId, +versionId);
  const {
    status: blogStatus,
    id,
    slug,
    isEnabled,
    currentVersion: { versionNumber },
    versions,
  } = blogData!;

  return status !== "success" ? (
    <div>No Data found, {message}</div>
  ) : (
    <div className="flex w-full p-2 gap-4">
      <VersionListing
        publishedVersion={versionNumber}
        currentVersion={+versionId}
        versions={versions}
        blogId={+blogId}
      />
      <EditBlog
        blogId={id}
        content={currentVersionData?.content ?? ''}
        slug={slug}
        status={blogStatus}
        title={currentVersionData?.title ?? ''}
        state={isEnabled}
      />
    </div>
  );
}

export default UpdateBlog;
