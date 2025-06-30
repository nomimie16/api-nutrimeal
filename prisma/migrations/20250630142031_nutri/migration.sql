/*
  Warnings:

  - Changed the type of `categorie` on the `Recette` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Recette" DROP COLUMN "categorie",
ADD COLUMN     "categorie" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Categorie";
