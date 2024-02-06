/*
  Warnings:

  - You are about to drop the column `title` on the `Anteproyecto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[titulo]` on the table `Anteproyecto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `titulo` to the `Anteproyecto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Anteproyecto_title_idx";

-- DropIndex
DROP INDEX "Anteproyecto_title_key";

-- AlterTable
ALTER TABLE "Anteproyecto" DROP COLUMN "title",
ADD COLUMN     "titulo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Anteproyecto_titulo_key" ON "Anteproyecto"("titulo");

-- CreateIndex
CREATE INDEX "Anteproyecto_titulo_idx" ON "Anteproyecto"("titulo");
