-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('premium', 'energy');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('await', 'pending', 'succeeded', 'failed');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "telegram_id" VARCHAR(50) NOT NULL,
    "nickname" VARCHAR(100) NOT NULL,
    "avatar_url" VARCHAR(255),
    "timezone" VARCHAR(20),
    "language_code" VARCHAR(10),
    "ton_wallet" VARCHAR(100),
    "premium_ends_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "invite_code" SERIAL NOT NULL,
    "invited_by_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "LoginLog" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "ip" VARCHAR(50) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "timezone" VARCHAR(50) NOT NULL,
    "user_agent" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoginLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "ton_wallet" VARCHAR(100) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "amount" DECIMAL(20,10) NOT NULL,
    "gas_fee" DECIMAL(20,10),
    "tx_hash" VARCHAR(255),
    "payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_id_key" ON "User"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_invite_code_key" ON "User"("invite_code");

-- CreateIndex
CREATE UNIQUE INDEX "LoginLog_user_id_key" ON "LoginLog"("user_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_invited_by_id_fkey" FOREIGN KEY ("invited_by_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginLog" ADD CONSTRAINT "LoginLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
