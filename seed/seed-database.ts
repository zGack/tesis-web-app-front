import { initialData } from "./seed";
import prisma from "../lib/prisma";

/**
 * Este script auxiliar tiene como fin poblar la base de datos con informacion ficticia. 
 */
async function main() {
  await prisma.usersOnTrabajosDeGrado.deleteMany();
  await prisma.trabajosDeGrado.deleteMany();
  await prisma.usersOnAnteproyectos.deleteMany();
  await prisma.anteproyecto.deleteMany();
  await prisma.user.deleteMany();

  const { users, anteproyectos } = initialData;

  // 1. Insertar usuarios en la DB
  await prisma.user.createMany({
    data: users
  })

  // 2. Insertar anteproyectos
  const usersDB = await prisma.user.findMany();

  const usersMap = usersDB.reduce( (map, user) => {
    map[ user.email ] = user.id;
    return map;
  }, {} as Record<string, string>); // <email:string, id:string>

  anteproyectos.forEach( async(anteproyecto) => {

    const { users, ...rest } = anteproyecto;

    const anteproyectoDB = await prisma.anteproyecto.create({
      data: rest
    })

    // 3. Insertar las relaciones de usuario - anteproyecto
    const usersOnAnteproyectosData = users.map( user => ({
      userId: usersMap[user],
      anteproyectoId: anteproyectoDB.id
    }));

    await prisma.usersOnAnteproyectos.createMany({
      data: usersOnAnteproyectosData
    })

  });


  // 4. Insertar trabajos de grado

  // 5. Insertar las relaciones de usuario - trabajo de grado


  console.log("Seed ejecutado exitosamente.");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
