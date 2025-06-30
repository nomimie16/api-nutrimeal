-- DropForeignKey
ALTER TABLE "Recette" DROP CONSTRAINT "Recette_valeursNutritionnellesId_fkey";

-- AlterTable
ALTER TABLE "Recette" ALTER COLUMN "valeursNutritionnellesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Recette" ADD CONSTRAINT "Recette_valeursNutritionnellesId_fkey" FOREIGN KEY ("valeursNutritionnellesId") REFERENCES "ValeursNutritionnelles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
