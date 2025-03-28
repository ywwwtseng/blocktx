/*
  Warnings:

  - You are about to drop the `Energy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HashChallenge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Energy" DROP CONSTRAINT "Energy_user_id_fkey";

-- DropForeignKey
ALTER TABLE "HashChallenge" DROP CONSTRAINT "HashChallenge_user_id_fkey";

-- DropTable
DROP TABLE "Energy";

-- DropTable
DROP TABLE "HashChallenge";
