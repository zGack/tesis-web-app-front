/*
  Warnings:

  - You are about to drop the `TrabajosDeGrado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrabajosDeGrado" DROP CONSTRAINT "TrabajosDeGrado_anteproyectoId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnTrabajosDeGrado" DROP CONSTRAINT "UsersOnTrabajosDeGrado_trabajoDeGradoId_fkey";

-- DropIndex
DROP INDEX "Anteproyecto_titulo_idx";

-- DropTable
DROP TABLE "TrabajosDeGrado";

-- CreateTable
CREATE TABLE "TrabajoDeGrado" (
    "id" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "noAct" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensionHonor" BOOLEAN NOT NULL,
    "notaDefinitiva" DOUBLE PRECISION,
    "gradoPostular" "Grado" NOT NULL DEFAULT 'pregrado',
    "fechaSustentacion" TIMESTAMP(3),
    "slug" TEXT NOT NULL,
    "anteproyectoId" TEXT NOT NULL,

    CONSTRAINT "TrabajoDeGrado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrabajoDeGrado_titulo_key" ON "TrabajoDeGrado"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "TrabajoDeGrado_slug_key" ON "TrabajoDeGrado"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TrabajoDeGrado_anteproyectoId_key" ON "TrabajoDeGrado"("anteproyectoId");

-- CreateIndex
CREATE INDEX "TrabajoDeGrado_titulo_slug_idx" ON "TrabajoDeGrado"("titulo", "slug");

-- CreateIndex
CREATE INDEX "Anteproyecto_titulo_slug_idx" ON "Anteproyecto"("titulo", "slug");

-- AddForeignKey
ALTER TABLE "TrabajoDeGrado" ADD CONSTRAINT "TrabajoDeGrado_anteproyectoId_fkey" FOREIGN KEY ("anteproyectoId") REFERENCES "Anteproyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnTrabajosDeGrado" ADD CONSTRAINT "UsersOnTrabajosDeGrado_trabajoDeGradoId_fkey" FOREIGN KEY ("trabajoDeGradoId") REFERENCES "TrabajoDeGrado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
