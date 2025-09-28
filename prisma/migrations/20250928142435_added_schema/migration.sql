-- CreateEnum
CREATE TYPE "NodeStatus" AS ENUM ('active', 'archive');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('draft', 'published');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('available', 'reserved', 'sold');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('created', 'pending', 'paid', 'canceled');

-- CreateEnum
CREATE TYPE "TransactionDirection" AS ENUM ('deposit', 'withdraw');

-- CreateTable
CREATE TABLE "Nodes" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL,
    "commission" DECIMAL(5,2) NOT NULL,
    "created_at" TIMESTAMP(3),
    "main_organizer_id" INTEGER,

    CONSTRAINT "Nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" VARCHAR(20),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "registration_date" TIMESTAMP(3),
    "external_provider_id" TEXT,
    "reset_token" TEXT,
    "reset_token_exp" TIMESTAMP(3),
    "verification_code" TEXT,
    "verification_code_exp" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNodes" (
    "user_id" INTEGER NOT NULL,
    "node_id" UUID NOT NULL,

    CONSTRAINT "UserNodes_pkey" PRIMARY KEY ("user_id","node_id")
);

-- CreateTable
CREATE TABLE "AdminUsers" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password_hash" TEXT,
    "role" VARCHAR(255) NOT NULL DEFAULT 'default',
    "node_id" UUID NOT NULL,
    "user_hash" TEXT,
    "is_docs_verif" BOOLEAN,

    CONSTRAINT "AdminUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currencies" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,

    CONSTRAINT "Currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Files" (
    "id" UUID NOT NULL,
    "bucket" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),
    "size" INTEGER NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "node_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" "EventStatus" NOT NULL,
    "description" TEXT,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(255),
    "address" TEXT,
    "city_id" INTEGER,
    "tickets_prices" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "tickets_total" INTEGER NOT NULL DEFAULT 0,
    "tickets_available" INTEGER NOT NULL DEFAULT 0,
    "last_edit" TIMESTAMPTZ,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventGenres" (
    "event_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "EventGenres_pkey" PRIMARY KEY ("event_id","genre_id")
);

-- CreateTable
CREATE TABLE "EventPhotos" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "file_id" UUID NOT NULL,
    "location" VARCHAR(100),

    CONSTRAINT "EventPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "buyer_user_id" INTEGER,
    "node_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(10,2) NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "status" "TicketStatus" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendedEvents" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecommendedEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "node_id" UUID NOT NULL,
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER,
    "status" "TransactionStatus" NOT NULL,
    "direction" "TransactionDirection" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "request_date" TIMESTAMP(3),
    "payment_system_id" TEXT,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseItems" (
    "id" SERIAL NOT NULL,
    "node_id" UUID NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "qr_token" TEXT NOT NULL,
    "validated_at" TIMESTAMP(3),

    CONSTRAINT "PurchaseItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizers" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Organizers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizerBalances" (
    "id" SERIAL NOT NULL,
    "organizer_id" INTEGER NOT NULL,
    "node_id" UUID NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "active_balance" DECIMAL(10,2) NOT NULL,
    "pending_balance" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3),
    "activation_date" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "OrganizerBalances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nodes_slug_key" ON "Nodes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Genres_name_key" ON "Genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cities_name_key" ON "Cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Currencies_code_key" ON "Currencies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Files_filename_key" ON "Files"("filename");

-- CreateIndex
CREATE UNIQUE INDEX "RecommendedEvents_event_id_user_id_key" ON "RecommendedEvents"("event_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseItems_qr_token_key" ON "PurchaseItems"("qr_token");

-- AddForeignKey
ALTER TABLE "UserNodes" ADD CONSTRAINT "UserNodes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNodes" ADD CONSTRAINT "UserNodes_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "Nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminUsers" ADD CONSTRAINT "AdminUsers_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "Nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "Nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "Cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGenres" ADD CONSTRAINT "EventGenres_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGenres" ADD CONSTRAINT "EventGenres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPhotos" ADD CONSTRAINT "EventPhotos_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPhotos" ADD CONSTRAINT "EventPhotos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "Files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_buyer_user_id_fkey" FOREIGN KEY ("buyer_user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "Nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendedEvents" ADD CONSTRAINT "RecommendedEvents_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendedEvents" ADD CONSTRAINT "RecommendedEvents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "Nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItems" ADD CONSTRAINT "PurchaseItems_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "Nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItems" ADD CONSTRAINT "PurchaseItems_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItems" ADD CONSTRAINT "PurchaseItems_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerBalances" ADD CONSTRAINT "OrganizerBalances_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "Organizers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerBalances" ADD CONSTRAINT "OrganizerBalances_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "Nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerBalances" ADD CONSTRAINT "OrganizerBalances_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
