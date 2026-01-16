"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogStatus } from "@/generated/prisma/enums";
import { useRouter, useSearchParams } from "next/navigation";

function BlogListingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Tabs
      defaultValue="all-blogs"
      className="w-[400px]"
      onValueChange={(data) => {
        const params = new URLSearchParams(searchParams);
        params.set("status", data);
        router.push(`?${params.toString()}`);
      }}
    >
      <TabsList>
        <TabsTrigger value="all-blogs">All Blogs</TabsTrigger>
        <TabsTrigger value={BlogStatus.DRAFT}>Drafts</TabsTrigger>
        <TabsTrigger value={BlogStatus.PUBLISHED}>Published</TabsTrigger>
      </TabsList>
      <TabsContent value="all-blogs" />
      <TabsContent value={BlogStatus.DRAFT} />
      <TabsContent value={BlogStatus.PUBLISHED} />
    </Tabs>
  );
}

export default BlogListingClient;
