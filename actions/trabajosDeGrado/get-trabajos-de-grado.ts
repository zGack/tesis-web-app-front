'use server';

import prisma from "@/lib/prisma";

export const getTrabajosDeGrado = async () => {
  try {
    const trabajosDeGrado = await prisma.trabajoDeGrado.findMany({
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
              }
            },
            userOnTrabajoDeGradoRole: true
          }
        },
      }
    })  

    return {
      trabajosDeGrado: trabajosDeGrado.map((proyecto) => ({
        ...proyecto,
        users: proyecto.users.map(({user, userOnTrabajoDeGradoRole}) => ({...user, role: [userOnTrabajoDeGradoRole]}))
      }))
    };
    
  } catch (error) {
    console.log(error);
    throw new Error("No se pudieron cargar los trabajos de grado");
  }
}
