/*
  Warnings:

  - Added the required column `image` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN "image" VARCHAR(255);
UPDATE "Event" SET "image" = 'mock_image' WHERE "image" IS NULL;
ALTER TABLE "Event" ALTER COLUMN "image" SET NOT NULL;
