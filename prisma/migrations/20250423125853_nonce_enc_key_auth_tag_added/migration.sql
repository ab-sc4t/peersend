/*
  Warnings:

  - You are about to drop the column `aeskey` on the `Message` table. All the data in the column will be lost.
  - Added the required column `authTag` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encryptedAesKey` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nonce` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "aeskey",
ADD COLUMN     "authTag" TEXT NOT NULL,
ADD COLUMN     "encryptedAesKey" TEXT NOT NULL,
ADD COLUMN     "nonce" TEXT NOT NULL;
