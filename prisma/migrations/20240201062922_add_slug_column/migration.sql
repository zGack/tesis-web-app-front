/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Anteproyecto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Anteproyecto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anteproyecto" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Anteproyecto_slug_key" ON "Anteproyecto"("slug");
