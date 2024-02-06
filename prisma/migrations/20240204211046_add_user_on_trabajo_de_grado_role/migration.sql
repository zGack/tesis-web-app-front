/*
  Warnings:

  - Added the required column `userOnTrabajoDeGradoRole` to the `UsersOnTrabajosDeGrado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsersOnTrabajosDeGrado" ADD COLUMN     "userOnTrabajoDeGradoRole" "Role" NOT NULL;
