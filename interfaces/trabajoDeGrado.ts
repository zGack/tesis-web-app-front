import { TableUser } from ".";

export interface TrabajoDeGrado {
  id: string;
  periodo: string;
  noAct: number;
  titulo: string;
  mensionHonor: boolean;
  notaDefinitiva: number | null;
  slug: string;
  gradoPostular: ValidGrades;
  fechaSustentacion: Date | null;
  fechaCreacion: Date;
  users: TableUser[];
  anteproyectoId: string;
}

export const GradesParsed = {
  "pregrado": "Pregrado",
  "especializacion": "Especialización",
  "maestria": "Maestría",
  "doctorado": "Doctorado",
}


export type ValidGrades =
  | "pregrado"
  | "especializacion"
  | "maestria"
  | "doctorado";
