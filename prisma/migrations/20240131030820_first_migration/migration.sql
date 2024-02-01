-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'estudiante', 'evaluador', 'director', 'jurado');

-- CreateEnum
CREATE TYPE "Grado" AS ENUM ('pregrado', 'especializacion', 'maestria', 'doctorado');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "role" "Role"[] DEFAULT ARRAY['estudiante']::"Role"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anteproyecto" (
    "id" TEXT NOT NULL,
    "noRadicacion" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL,
    "fechaEntregaAEvaluador" TIMESTAMP(3),
    "fechaEntregaDeEvaluador" TIMESTAMP(3),
    "fechaAprobacion" TIMESTAMP(3),
    "estado" INTEGER NOT NULL DEFAULT 0,
    "noEntrega" INTEGER NOT NULL,

    CONSTRAINT "Anteproyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrabajosDeGrado" (
    "id" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "noAct" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensionHonor" BOOLEAN NOT NULL,
    "notaDefinitiva" DOUBLE PRECISION,
    "gradoPostular" "Grado" NOT NULL DEFAULT 'pregrado',
    "fechaSustentacion" TIMESTAMP(3),
    "anteproyectoId" TEXT NOT NULL,

    CONSTRAINT "TrabajosDeGrado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnAnteproyectos" (
    "userId" TEXT NOT NULL,
    "anteproyectoId" TEXT NOT NULL,

    CONSTRAINT "UsersOnAnteproyectos_pkey" PRIMARY KEY ("userId","anteproyectoId")
);

-- CreateTable
CREATE TABLE "UsersOnTrabajosDeGrado" (
    "userId" TEXT NOT NULL,
    "trabajoDeGradoId" TEXT NOT NULL,

    CONSTRAINT "UsersOnTrabajosDeGrado_pkey" PRIMARY KEY ("userId","trabajoDeGradoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Anteproyecto_title_key" ON "Anteproyecto"("title");

-- CreateIndex
CREATE INDEX "Anteproyecto_title_idx" ON "Anteproyecto"("title");

-- CreateIndex
CREATE UNIQUE INDEX "TrabajosDeGrado_titulo_key" ON "TrabajosDeGrado"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "TrabajosDeGrado_anteproyectoId_key" ON "TrabajosDeGrado"("anteproyectoId");

-- CreateIndex
CREATE INDEX "TrabajosDeGrado_titulo_idx" ON "TrabajosDeGrado"("titulo");

-- AddForeignKey
ALTER TABLE "TrabajosDeGrado" ADD CONSTRAINT "TrabajosDeGrado_anteproyectoId_fkey" FOREIGN KEY ("anteproyectoId") REFERENCES "Anteproyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnAnteproyectos" ADD CONSTRAINT "UsersOnAnteproyectos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnAnteproyectos" ADD CONSTRAINT "UsersOnAnteproyectos_anteproyectoId_fkey" FOREIGN KEY ("anteproyectoId") REFERENCES "Anteproyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnTrabajosDeGrado" ADD CONSTRAINT "UsersOnTrabajosDeGrado_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnTrabajosDeGrado" ADD CONSTRAINT "UsersOnTrabajosDeGrado_trabajoDeGradoId_fkey" FOREIGN KEY ("trabajoDeGradoId") REFERENCES "TrabajosDeGrado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
