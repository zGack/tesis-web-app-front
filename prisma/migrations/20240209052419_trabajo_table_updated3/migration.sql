/*
  Warnings:

  - Added the required column `fechaCreacion` to the `TrabajoDeGrado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrabajoDeGrado" ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL;
