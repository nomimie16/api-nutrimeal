/*
  Warnings:

  - Added the required column `categorie` to the `Recette` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Categorie" AS ENUM ('plat', 'Dessert', 'PetitDejeuner', 'Aperetif', 'Entree', 'Boisson');

-- AlterTable
ALTER TABLE "Recette" ADD COLUMN     "categorie" "Categorie" NOT NULL;
