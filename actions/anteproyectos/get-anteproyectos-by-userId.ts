import prisma from "@/lib/prisma";

export const getAnteproyectosByUserId = async ( id: string ) => {
  try {
    const userOnAnteproyectos = await prisma.usersOnAnteproyectos.findMany({
      include: {
        anteproyecto: {
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

    if ( !userOnAnteproyectos ) return null;

    return {
      anteproyectos: userOnAnteproyectos!.map(({anteproyecto}) => ({slug: anteproyecto?.slug, titulo: anteproyecto?.titulo}))
    };

  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener anteproyectos por user id");
  }

}