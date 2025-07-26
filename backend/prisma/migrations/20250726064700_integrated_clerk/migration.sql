/*
  Warnings:

  - A unique constraint covering the columns `[clerkUserId]` on the table `AppOwner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[distinctId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkUserId` to the `AppOwner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppOwner" ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AppOwner_clerkUserId_key" ON "AppOwner"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_distinctId_key" ON "Event"("distinctId");
