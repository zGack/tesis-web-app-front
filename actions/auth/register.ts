'use server';

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

interface Params {
  personalId: number,
  email: string,
  password: string,
  name: string,
  lastname: string
}

export const registerUser = async ({ personalId, email, password, name, lastname}: Params) => {

  try {
    const user = await prisma.user.create({
      data: {
        name,
        lastname,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password)

      },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true
      }
    });

    return {
      ok: true,
      user
    }

  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo crear el usuario'
    } 
  }
  
}