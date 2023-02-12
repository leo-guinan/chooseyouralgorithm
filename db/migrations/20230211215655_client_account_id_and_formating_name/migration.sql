/*
  Warnings:

  - You are about to drop the column `curator_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "curator_id",
ADD COLUMN     "clientAccountId" INTEGER,
ADD COLUMN     "curatorId" INTEGER;
