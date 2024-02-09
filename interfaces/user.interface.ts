
export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
  role: ValidRoles[];
}

export type ValidRoles = 'admin' | 'estudiante' | 'director' | 'evaluador' | 'jurado';

// id       String  @id @default(uuid())
//   name     String
//   lastname String
//   email    String  @unique
//   password String
//   active   Boolean @default(true)
//   role     Role[] @default([estudiante])

//   anteproyectos    UsersOnAnteproyectos[]
//   trabajosDeGrados UsersOnTrabajosDeGrado[]