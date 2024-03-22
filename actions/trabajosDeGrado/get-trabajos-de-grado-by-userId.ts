import prisma from "@/lib/prisma";

export const getTrabajosDeGradoByUserId = async ( id: string ) => {
  try {
    const userOnTrabajosDeGrado = await prisma.usersOnTrabajosDeGrado.findMany({
      include: {
        trabajoDeGrado: {
          select: {
            slug: true,
            titulo: true
          }
        }
      },
      where: {
        userId: id
      }
    })

    if ( !userOnTrabajosDeGrado ) return null;

    return {
      trabajosDeGrado: userOnTrabajosDeGrado!.map(({trabajoDeGrado}) => ({slug: trabajoDeGrado?.slug, titulo: trabajoDeGrado?.titulo}))
    };

  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener trabajosDeGrado por user id");
  }

}