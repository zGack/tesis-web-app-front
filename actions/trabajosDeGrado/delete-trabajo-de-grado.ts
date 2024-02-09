'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const deleteTrabajoDeGrado = async ( id: string ) => {
  
  const idParsed = z.string().uuid().safeParse(id);

  if ( !idParsed.success ) {
    console.log(idParsed.error);
    return { ok: false };
  }    
  
  try {

    await prisma.usersOnTrabajosDeGrado.deleteMany({
      where: { 
        trabajoDeGradoId: id
      }
    })

    const trabajoDeGrado = await prisma.trabajoDeGrado.delete({
      where: { id },  
    })

    revalidatePath('/trabajos-de-grado');
    revalidatePath(`/trabajo-de-grado/${trabajoDeGrado.slug}`);
    revalidatePath(`/trabajo-de-grado/editar/${trabajoDeGrado.slug}`);

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