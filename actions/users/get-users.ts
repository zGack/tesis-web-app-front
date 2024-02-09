'use server';

import prisma from "@/lib/prisma";

export const getUsers = async () => {
  try {
      
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'desc'
      }
    })

    return {
      ok: true,  
      users
    };
    
  } catch (error) {
    console.log(error);
    throw new Error("No se pudieron cargar los usuarios");
  }
}
