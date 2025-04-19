/*
  Warnings:

  - You are about to drop the column `image` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `verification_status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `VerificationDocument` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `price` on table `Ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "VerificationDocument" DROP CONSTRAINT "VerificationDocument_user_id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "buyer_id" INTEGER,
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verification_status",
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "VerificationDocument";

-- DropEnum
DROP TYPE "VerificationStatus";

-- CreateTable
CREATE TABLE "EventPhoto" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "EventPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealTicket" (
    "id" SERIAL NOT NULL,
    "deal_id" INTEGER NOT NULL,
    "ticket_id" INTEGER NOT NULL,

    CONSTRAINT "DealTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DealTicket_ticket_id_key" ON "DealTicket"("ticket_id");

-- AddForeignKey
ALTER TABLE "EventPhoto" ADD CONSTRAINT "EventPhoto_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPhoto" ADD CONSTRAINT "EventPhoto_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealTicket" ADD CONSTRAINT "DealTicket_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealTicket" ADD CONSTRAINT "DealTicket_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
