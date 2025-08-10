/*
  Warnings:

  - You are about to alter the column `latitude` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `longitude` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(10,2);
