import { IUser } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  // Props
  isLoggedIn: boolean;
  user?: IUser;

  // Methods
  loginUser: (email: string, password: string) => Promise<boolean>;

}
export const AuthContext = createContext({} as ContextProps);
