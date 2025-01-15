/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('NotVerified', 'Verified', 'Reupload');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('coming', 'completed');

-- CreateEnum
CREATE TYPE "TransactionDirection" AS ENUM ('deposit', 'withdraw');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('created', 'in_process', 'completed');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('unverified', 'verified');

-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('in_progress', 'completed', 'declined');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "image",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone_number" VARCHAR(20),
ADD COLUMN     "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD COLUMN     "verification_status" "VerificationStatus" NOT NULL DEFAULT 'NotVerified',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "VerificationDocument" (
    "doc_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "document_image" VARCHAR(255),
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'NotVerified',

    CONSTRAINT "VerificationDocument_pkey" PRIMARY KEY ("doc_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'coming',
    "genre" VARCHAR(100),
    "tickets_available" INTEGER NOT NULL DEFAULT 0,
    "tickets_sold" INTEGER NOT NULL DEFAULT 0,
    "event_date" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(255),
    "description" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transaction_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "direction" "TransactionDirection" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "TransactionStatus" NOT NULL DEFAULT 'created',

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" VARCHAR(255),
    "status" "TicketStatus" NOT NULL DEFAULT 'unverified',

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal" (
    "deal_id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "buyer_id" INTEGER NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "deal_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "DealStatus" NOT NULL DEFAULT 'in_progress',
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("deal_id")
);

-- AddForeignKey
ALTER TABLE "VerificationDocument" ADD CONSTRAINT "VerificationDocument_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Выполнение триггеров
CREATE OR REPLACE FUNCTION update_event_ticket_counts() 
RETURNS TRIGGER AS $$
BEGIN
    -- Если билет добавляется
    IF TG_OP = 'INSERT' THEN
        -- Увеличиваем количество проданных билетов
        UPDATE events
        SET tickets_sold = tickets_sold + 1,
            tickets_available = tickets_available - 1
        WHERE event_id = NEW.event_id;

    -- Если статус билета обновляется
    ELSIF TG_OP = 'UPDATE' THEN
        -- Проверяем, изменился ли статус билета
        IF NEW.status = 'verified' AND OLD.status != 'verified' THEN
            -- Увеличиваем количество проданных билетов
            UPDATE events
            SET tickets_sold = tickets_sold + 1,
                tickets_available = tickets_available - 1
            WHERE event_id = NEW.event_id;
        ELSIF NEW.status != 'verified' AND OLD.status = 'verified' THEN
            -- Уменьшаем количество проданных билетов
            UPDATE events
            SET tickets_sold = tickets_sold - 1,
                tickets_available = tickets_available + 1
            WHERE event_id = NEW.event_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ticket_count_trigger
AFTER INSERT OR UPDATE ON "Ticket"
FOR EACH ROW EXECUTE FUNCTION update_event_ticket_counts();