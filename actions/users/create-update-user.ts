'use server';

import prisma from "@/lib/prisma";
import { Role, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcryptjs from 'bcryptjs';

const userSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  active: z.boolean(),
  role: z.array(z.nativeEnum(Role))
});


export const createUpdateUser = async ( userData: string ) => {
  
  const userParsed = userSchema.safeParse(JSON.parse(userData));

  if ( !userParsed.success ) {
    console.log(userParsed.error);
    return { ok: false };
  }    
  
  const user = userParsed.data;

  const { id, password, ...rest } = user;

  try {
    if ( id ) {

      await prisma.user.update({
        where: { id },
        data: {
          ...rest,
          password: password ? bcryptjs.hashSync(password) : undefined
        },

        
      })
    } else {
      await prisma.user.create({
        data: {
          ...rest,
          password: bcryptjs.hashSync(password!)
        },
      });
    }   

    revalidatePath('/usuarios');

    return {
      ok: true,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: 'Error al actualizar/crear usuario, revisar logs'
    }
  }
}