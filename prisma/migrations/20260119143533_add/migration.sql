/*
  Warnings:

  - A unique constraint covering the columns `[blogId,versionNumber]` on the table `BlogVersion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Blog_id_idx" ON "Blog"("id");

-- CreateIndex
CREATE INDEX "BlogVersion_blogId_idx" ON "BlogVersion"("blogId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogVersion_blogId_versionNumber_key" ON "BlogVersion"("blogId", "versionNumber");
