/*
  Warnings:

  - Added the required column `requestorId` to the `PodcastRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PodcastRequest" ADD COLUMN     "requestorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PodcastRequest" ADD CONSTRAINT "PodcastRequest_requestorId_fkey" FOREIGN KEY ("requestorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
