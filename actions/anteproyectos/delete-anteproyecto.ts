'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { deleteTrabajoDeGrado } from "../trabajosDeGrado/delete-trabajo-de-grado";

export const deleteAnteproyecto = async ( id: string ) => {
  
  const idParsed = z.string().uuid().safeParse(id);

  if ( !idParsed.success ) {
    console.log(idParsed.error);
    return { ok: false };
  }    
  
  try {

    const trabajoDeGradoId = await prisma.trabajoDeGrado.findUnique({
      where: { anteproyectoId: id },
      select: {
        id: true
      }
    }) 

    if ( trabajoDeGradoId?.id ) {
      await prisma.usersOnTrabajosDeGrado.deleteMany({
        where: { 
          trabajoDeGradoId: trabajoDeGradoId?.id
        }
      })

      await prisma.trabajoDeGrado.delete({
        where: {
          anteproyectoId: id
        }
      })
    }

    await prisma.usersOnAnteproyectos.deleteMany({
      where: { 
        anteproyectoId: id
      }
    })

    const anteproyecto = await prisma.anteproyecto.delete({
      where: { id },
      include: {
        trabajoDeGrado: {
          select: {
            id: true
          }
        }
      }
    })

    revalidatePath('/anteproyectos');
    revalidatePath(`/anteproyecto/${anteproyecto.slug}`);
    revalidatePath(`/anteproyecto/editar/${anteproyecto.slug}`);

    return {
      ok: true,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: 'Error al borrar anteproyecto, revisar logs'
    }
  }
}