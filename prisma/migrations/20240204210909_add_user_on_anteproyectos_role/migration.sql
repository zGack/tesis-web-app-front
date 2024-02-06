/*
  Warnings:

  - Added the required column `userOnAnteproyectoRole` to the `UsersOnAnteproyectos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsersOnAnteproyectos" ADD COLUMN     "userOnAnteproyectoRole" "Role" NOT NULL;
