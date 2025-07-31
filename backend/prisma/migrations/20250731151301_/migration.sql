/*
  Warnings:

  - You are about to drop the column `userAgent` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "userAgent",
ADD COLUMN     "useragent" TEXT;
