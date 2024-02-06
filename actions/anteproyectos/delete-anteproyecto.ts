'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const deleteAnteproyecto = async ( id: string ) => {
  
  const idParsed = z.string().uuid().safeParse(id);

  if ( !idParsed.success ) {
    console.log(idParsed.error);
    return { ok: false };
  }    
  
  try {

    await prisma.usersOnAnteproyectos.deleteMany({
      where: { 
        anteproyectoId: id
      }
    })

    const anteproyecto = await prisma.anteproyecto.delete({
      where: { id },  
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