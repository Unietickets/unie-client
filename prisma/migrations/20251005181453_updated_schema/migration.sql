/*
  Warnings:

  - Added the required column `currency_id` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "EventStatus" ADD VALUE 'completed';

-- AlterTable
ALTER TABLE "AdminUsers" ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "currency_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
