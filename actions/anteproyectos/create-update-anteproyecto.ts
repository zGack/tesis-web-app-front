'use server';

import { ValidRoles } from "@/interfaces";
import prisma from "@/lib/prisma";
import { SeedAnteproyecto } from "@/seed/seed";
import { Anteproyecto, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const anteproyectoSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  titulo: z.string(),
  slug: z.string(),
  noRadicacion: z.coerce
    .number()
    .min(0),
  fechaCreacion: z.coerce.date(),
  fechaEntregaAEvaluador: z.coerce
    .date()
    .optional()
    .nullable(),
  fechaEntregaDeEvaluador: z.coerce
    .date()
    .optional()
    .nullable(),
  fechaAprobacion: z.coerce
    .date()
    .optional()
    .nullable(),
  estado: z.coerce
    .number()
    .min(1)
    .max(4),
  noEntrega: z.coerce
    .number()
    .min(0)
    .max(4),
  users: z
    .object({ id: z.string().uuid(), role: z.nativeEnum(Role)})
    .array()
});


export const createUpdateAnteproyecto = async ( anteproyectoData: string ) => {
  
  const anteproyectoParsed = anteproyectoSchema.safeParse(JSON.parse(anteproyectoData));

  if ( !anteproyectoParsed.success ) {
    console.log(anteproyectoParsed.error);
    return { ok: false };
  }    
  
  const anteproyecto = anteproyectoParsed.data;

  const { id, users, ...rest } = anteproyecto;

  try {
    let anteproyecto: Anteproyecto;

    if ( id ) {
      anteproyecto = await prisma.anteproyecto.update({
        where: { id },  
        data: {
          ...rest,
        },
        
      })

      const usersOnAnteproyectosData = users.map( user => ({
        userId: user.id,
        anteproyectoId: anteproyecto.id,
        userOnAnteproyectoRole: user.role as ValidRoles
      }));

      await prisma.usersOnAnteproyectos.deleteMany({
        where: { 
          anteproyectoId: anteproyecto.id
        }
      })

      await prisma.usersOnAnteproyectos.createMany({
        data: usersOnAnteproyectosData
      })

    } else {
      anteproyecto = await prisma.anteproyecto.create({
        data: {
          ...rest,
        },
      });

      const usersOnAnteproyectosData = users.map( user => ({
        userId: user.id,
        anteproyectoId: anteproyecto.id,
        userOnAnteproyectoRole: user.role as ValidRoles
      }));

      await prisma.usersOnAnteproyectos.createMany({
        data: usersOnAnteproyectosData
      })
    }   

    revalidatePath('/anteproyectos');
    revalidatePath(`/anteproyecto/${anteproyecto.slug}`);
    revalidatePath(`/anteproyecto/editar/${anteproyecto.slug}`);

    return {
      ok: true,
      anteproyecto: anteproyecto!
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: 'Error al actualizar/crear anteproyecto, revisar logs'
    }
  }
}