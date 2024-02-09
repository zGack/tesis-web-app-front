import { initialData } from "./seed";
import prisma from "../lib/prisma";

/**
 * Este script auxiliar tiene como fin poblar la base de datos con informacion ficticia. 
 */
async function main() {
  await prisma.usersOnTrabajosDeGrado.deleteMany();
  await prisma.trabajoDeGrado.deleteMany();
  await prisma.usersOnAnteproyectos.deleteMany();
  await prisma.anteproyecto.deleteMany();
  await prisma.user.deleteMany();

  const { users, anteproyectos, trabajosDeGrados } = initialData;

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
      userId: usersMap[user.email],
      anteproyectoId: anteproyectoDB.id,
      userOnAnteproyectoRole: user.role
    }));

    await prisma.usersOnAnteproyectos.createMany({
      data: usersOnAnteproyectosData
    })

  });

  // 4. Insertar trabajos de grado
  trabajosDeGrados.forEach( async(trabajoDeGrado) => {
    const { users, anteproyecto, ...rest } = trabajoDeGrado;

    const anteproyectoDB = await prisma.anteproyecto.findUnique({
      where: { slug: anteproyecto },
    })

    const trabajoDeGradoDB = await prisma.trabajoDeGrado.create({
      data: {
        ...rest,
        anteproyectoId: anteproyectoDB!.id,
        slug: anteproyectoDB!.slug
      }
    })

    // 3. Insertar las relaciones de usuario - anteproyecto
    const usersOnTrabajosDeGradoData = users.map( (user) => ({
      userId: usersMap[user.email],
      trabajoDeGradoId: trabajoDeGradoDB.id,
      userOnTrabajoDeGradoRole: user.role
    }));

    await prisma.usersOnTrabajosDeGrado.createMany({
      data: usersOnTrabajosDeGradoData
    })

  })
  
  console.log("Seed ejecutado exitosamente.");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
