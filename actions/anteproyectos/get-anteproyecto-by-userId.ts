import prisma from "@/lib/prisma";

export const getAnteproyectoByUserId = async ( id: string ) => {
  try {
    const userOnAnteproyecto = await prisma.usersOnAnteproyectos.findFirst({
      include: {
        anteproyecto: {
          select: {
            slug: true
          }
        }
      },
      where: {
        userId: id
      }
    })

    if ( !userOnAnteproyecto ) return null;

    return {
      slug: userOnAnteproyecto.anteproyecto!.slug
    };

  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener anteproyecto por user id");
  }

}