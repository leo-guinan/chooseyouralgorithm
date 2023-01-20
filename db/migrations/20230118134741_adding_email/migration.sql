/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Creator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Creator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Creator" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Creator_email_key" ON "Creator"("email");
