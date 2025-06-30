/*
  Warnings:

  - You are about to drop the column `ordre` on the `Instruction` table. All the data in the column will be lost.
  - You are about to drop the column `texte` on the `Instruction` table. All the data in the column will be lost.
  - Added the required column `etape` to the `Instruction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instruction" DROP COLUMN "ordre",
DROP COLUMN "texte",
ADD COLUMN     "etape" TEXT NOT NULL;
