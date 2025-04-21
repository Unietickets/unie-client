-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reset_token_exp" TIMESTAMP(3),
ADD COLUMN     "verification_code" TEXT,
ADD COLUMN     "verification_code_exp" TIMESTAMP(3);
