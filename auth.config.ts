import NextAuth, { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { z } from "zod";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  providers: [
    credentials({
      async authorize(credentials){

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(3) })
          .safeParse(credentials);

          if ( !parsedCredentials.success) return null;

        return null;
      }
    })
  ]
}

export const { signIn, signOut } = NextAuth(authConfig);