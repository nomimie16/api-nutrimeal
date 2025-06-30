/*
  Warnings:

  - You are about to drop the column `recetteId` on the `ValeursNutritionnelles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[valeursNutritionnellesId]` on the table `Recette` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `temps_preparation` to the `Recette` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valeursNutritionnellesId` to the `Recette` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ValeursNutritionnelles" DROP CONSTRAINT "ValeursNutritionnelles_recetteId_fkey";

-- DropIndex
DROP INDEX "ValeursNutritionnelles_recetteId_key";

-- AlterTable
ALTER TABLE "Recette" ADD COLUMN     "nb_vues" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "note" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "temps_preparation" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "valeursNutritionnellesId" INTEGER;

-- AlterTable
ALTER TABLE "ValeursNutritionnelles" DROP COLUMN "recetteId";

-- CreateIndex
CREATE UNIQUE INDEX "Recette_valeursNutritionnellesId_key" ON "Recette"("valeursNutritionnellesId");

-- AddForeignKey
ALTER TABLE "Recette" ADD CONSTRAINT "Recette_valeursNutritionnellesId_fkey" FOREIGN KEY ("valeursNutritionnellesId") REFERENCES "ValeursNutritionnelles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
UPDATE "Recette" SET "valeursNutritionnellesId" = 1 WHERE "valeursNutritionnellesId" IS NULL;