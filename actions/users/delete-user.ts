'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const deleteUser = async ( id: string ) => {
  
  const idParsed = z.string().uuid().safeParse(id);

  if ( !idParsed.success ) {
    console.log(idParsed.error);
    return { ok: false };
  }    
  
  try {

    await prisma.usersOnAnteproyectos.deleteMany({
      where: { userId: id },
    }) 

    await prisma.usersOnTrabajosDeGrado.deleteMany({
      where: { userId: id }
    })

    await prisma.user.delete({
      where: { id },
    });

    revalidatePath('/usuarios');

    return {
      ok: true,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: 'Error al borrar usuario, revisar logs'
    }
  }
}