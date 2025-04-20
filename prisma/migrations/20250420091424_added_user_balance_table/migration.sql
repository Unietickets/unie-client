-- CreateTable
CREATE TABLE "UserBalance" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "active_balance" DECIMAL(10,2) NOT NULL,
    "pending_balance" DECIMAL(10,2) NOT NULL,
    "activation_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBalance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBalance" ADD CONSTRAINT "UserBalance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
