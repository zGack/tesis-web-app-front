'use server';

import { ValidRoles } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Grado, Role, TrabajoDeGrado } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const trabajoDeGradoSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  periodo: z.string(),
  noAct: z.coerce
    .number()
    .min(0),
  titulo: z.string(),
  mensionHonor: z.boolean(),
  notaDefinitiva: z.coerce
    .number()
    .min(0)
    .max(5)
    .optional()
    .nullable(),
  gradoPostular: z.nativeEnum(Grado),
  fechaCreacion: z.coerce.date(),
  fechaSustentacion: z.coerce
    .date()
    .optional()
    .nullable(),
  slug: z.string(),
  anteproyectoId: z.string().uuid(),
  users: z
    .object({ id: z.string().uuid(), role: z.nativeEnum(Role)})
    .array()
});


export const createUpdateTrabajoDeGrado = async ( anteproyectoData: string ) => {
  
  const trabajoDeGradoParsed = trabajoDeGradoSchema.safeParse(JSON.parse(anteproyectoData));

  if ( !trabajoDeGradoParsed.success ) {
    console.log(trabajoDeGradoParsed.error);
    return { ok: false };
  }    
  
  const trabajoDeGrado = trabajoDeGradoParsed.data;

  const { id, users, ...rest } = trabajoDeGrado;

  try {
    let trabajoDeGrado: TrabajoDeGrado;

    if ( id ) {
      trabajoDeGrado = await prisma.trabajoDeGrado.update({
        where: { id },  
        data: {
          ...rest,
        },
        
      })

      const usersOnTrabajoDeGradoData = users.map( user => ({
        userId: user.id,
        trabajoDeGradoId: trabajoDeGrado.id,
        userOnTrabajoDeGradoRole: user.role as ValidRoles
      }));

      await prisma.usersOnTrabajosDeGrado.deleteMany({
        where: { 
          trabajoDeGradoId: trabajoDeGrado.id
        }
      })

      await prisma.usersOnTrabajosDeGrado.createMany({
        data: usersOnTrabajoDeGradoData
      })

    } else {
      trabajoDeGrado = await prisma.trabajoDeGrado.create({
        data: {
          ...rest,
        },
      });

      const usersOnTrabajoDeGradoData = users.map( user => ({
        userId: user.id,
        trabajoDeGradoId: trabajoDeGrado.id,
        userOnTrabajoDeGradoRole: user.role as ValidRoles
      }));

      await prisma.usersOnTrabajosDeGrado.createMany({
        data: usersOnTrabajoDeGradoData
      })

    }   

    revalidatePath('/trabajos-de-grado');
    revalidatePath(`/trabajo-de-grado/${trabajoDeGrado!.slug}`);
    revalidatePath(`/trabajo-de-grado/editar/${trabajoDeGrado!.slug}`);

    return {
      ok: true,
      trabajoDeGrado: trabajoDeGrado!
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: 'Error al actualizar/crear el trabajo de grado, revisar logs'
    }
  }
}