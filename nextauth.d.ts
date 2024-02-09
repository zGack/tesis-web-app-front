import NextAuth, { DefaultSession } from "next-auth"
import { ValidRoles } from "./interfaces";

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      lastname: string;
      email: string;
      role: ValidRoles[]
    } & DefaultSession['user']
  }
}