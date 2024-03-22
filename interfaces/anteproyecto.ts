
export interface Anteproyecto {
  id: string;
  noRadicacion: number;
  titulo: string;
  fechaCreacion: Date;
  fechaEntregaAEvaluador: Date | null;
  fechaEntregaDeEvaluador: Date | null;
  fechaAprobacion: Date | null;
  documento: String | null;
  correciones: String | null;
  estado: number;
  noEntrega: number;
  slug: string;
  users: TableUser[];
}

export interface TableUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: Role[];
}

export type Role = "admin" | "estudiante" | "director" | "evaluador" | "jurado";
