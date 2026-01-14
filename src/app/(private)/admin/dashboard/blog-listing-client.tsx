"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminBlogsPage from "./blog-listing";

function BlogListingClient() {
  return (
    <Tabs
      defaultValue="all-blogs"
      className="w-[400px]"
      onChange={(data) => {
        console.log(data);
      }}
    >
      <TabsList>
        <TabsTrigger value="all-blogs">All Blogs</TabsTrigger>
        <TabsTrigger value="drafts">Drafts</TabsTrigger>
        <TabsTrigger value="published">Published</TabsTrigger>
      </TabsList>
      <TabsContent value="all-blogs">
        <AdminBlogsPage />
      </TabsContent>
      <TabsContent value="drafts">
        <AdminBlogsPage />
      </TabsContent>
      <TabsContent value="published">
        <AdminBlogsPage />
      </TabsContent>
    </Tabs>
  );
}

export default BlogListingClient;
