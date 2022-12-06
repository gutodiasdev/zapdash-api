/*
  Warnings:

  - Added the required column `document` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RefeshToken" DROP CONSTRAINT "RefeshToken_userId_fkey";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "document" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weigth" TEXT;

-- AddForeignKey
ALTER TABLE "RefeshToken" ADD CONSTRAINT "RefeshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
