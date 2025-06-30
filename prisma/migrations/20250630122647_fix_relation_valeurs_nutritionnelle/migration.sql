/*
  Warnings:

  - Made the column `valeursNutritionnellesId` on table `Recette` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recette" ALTER COLUMN "temps_preparation" DROP DEFAULT,
ALTER COLUMN "valeursNutritionnellesId" SET NOT NULL;
