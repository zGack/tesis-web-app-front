import prisma from "@/lib/prisma";

export const getTrabajoDeGradoBySlug = async ( slug: string ) => {
  try {
    const trabajoDeGrado = await prisma.trabajoDeGrado.findFirst({
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
        }
      },
      where: {
        slug: slug
      }
    })  

    if ( !trabajoDeGrado ) return null;

    return {
      ...trabajoDeGrado,
        users: trabajoDeGrado.users.map(({user, userOnTrabajoDeGradoRole}) => ({...user, role:[userOnTrabajoDeGradoRole]}))
    };

  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener trabajo de grado por slug");
  }
}