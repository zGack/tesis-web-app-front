import prisma from "@/lib/prisma";

export const getTrabajoDeGradoByUserId = async ( id: string ) => {
  try {
    const userOnTrabajoDeGrado = await prisma.usersOnTrabajosDeGrado.findFirst({
      include: {
        trabajoDeGrado: {
          select: {
            slug: true
          }
        }
      },
      where: {
        userId: id
      }
    })

    if ( !userOnTrabajoDeGrado ) return null;

    return {
      slug: userOnTrabajoDeGrado.trabajoDeGrado!.slug
    };

  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener trabajo de grado por user id");
  }

}