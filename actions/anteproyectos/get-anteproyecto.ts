'use server';

import prisma from "@/lib/prisma";

export const getAnteproyectos = async () => {
  try {
    const anteproyectos = await prisma.anteproyecto.findMany({
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
                // role: true
              }
            },
            userOnAnteproyectoRole: true
          }
        },
      }
    })  

    return {
      anteproyectos: anteproyectos.map((anteproyecto) => ({
        ...anteproyecto,
        users: anteproyecto.users.map(({user, userOnAnteproyectoRole}) => ({...user, role: [userOnAnteproyectoRole]}))
      }))
    };
    
  } catch (error) {
    console.log(error);
    throw new Error("No se pudieron cargar los anteproyectos");
  }
}
