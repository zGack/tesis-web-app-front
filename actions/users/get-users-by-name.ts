'use server';

import prisma from "@/lib/prisma";
import { Role } from "@/interfaces";

export const getUsersByFullName = async( fullname: string, role: Role ) => {
  
  try {
    const finalSearch = fullname.replace(/(\w)\s+(\w)/g, '$1 | $2')

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              search: finalSearch,
              mode: 'insensitive'
            }, 
            
          },
          {
            lastname: {
              search: finalSearch,
              mode: 'insensitive'
            }
          },
          {
            name: {
              contains: finalSearch, 
              mode: 'insensitive'
            }, 
            
          },
          {
            lastname: {
              contains: finalSearch,
              mode: 'insensitive'
            }
          },
        ],
        role: {
          has: role
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
    throw new Error("error al obtener users por nombre");
  }
}