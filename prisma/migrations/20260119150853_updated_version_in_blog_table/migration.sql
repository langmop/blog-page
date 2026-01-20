/*
  Warnings:

  - You are about to drop the column `currentVersionNumber` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "currentVersionNumber",
ADD COLUMN     "currentVersionId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_currentVersionId_fkey" FOREIGN KEY ("currentVersionId") REFERENCES "BlogVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
