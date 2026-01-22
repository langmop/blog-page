-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_currentVersionId_fkey";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "currentVersionId" DROP NOT NULL,
ALTER COLUMN "currentVersionId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_currentVersionId_fkey" FOREIGN KEY ("currentVersionId") REFERENCES "BlogVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
