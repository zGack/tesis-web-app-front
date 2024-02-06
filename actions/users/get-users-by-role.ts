'use server';

import { Role } from "@/interfaces";
import prisma from "@/lib/prisma";


export const getUsersByRole = async( userRole: Role ) => {
  
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          has: userRole
        }
      },    
      orderBy: {
        name: 'asc'
      }
    })

    return {
      users
    }
    
  } catch (error) {
    console.log(error);
    throw new Error("error al obtener users por rol");
     
  }
}