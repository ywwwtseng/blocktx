-- CreateTable
CREATE TABLE "HashChallenge" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "hash_numeric_part" DECIMAL(45,0) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HashChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HashChallenge_user_id_key" ON "HashChallenge"("user_id");

-- AddForeignKey
ALTER TABLE "HashChallenge" ADD CONSTRAINT "HashChallenge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
