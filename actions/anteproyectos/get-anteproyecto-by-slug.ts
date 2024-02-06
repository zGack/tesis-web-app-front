import prisma from "@/lib/prisma";

export const getAnteproyectoBySlug = async ( slug: string ) => {
  try {
    const anteproyecto = await prisma.anteproyecto.findFirst({
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
                role: true
              }
            }
          }
        }
      },
      where: {
        slug: slug
      }
    })  

    if ( !anteproyecto ) return null;

    return {
      ...anteproyecto,
        users: anteproyecto.users.map(({user}) => ({...user}))
    };

  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener anteproyecto por slug");
  }
}