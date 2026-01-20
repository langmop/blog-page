/*
  Warnings:

  - You are about to drop the column `content` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "currentVersionNumber" INTEGER NOT NULL DEFAULT 1;
