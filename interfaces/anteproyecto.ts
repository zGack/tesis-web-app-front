import { IUser } from ".";

export interface Anteproyecto {
  anteproyectoId:          string;
  noRadicacion:            number;
  titulo:                  string;
  fechaEntregaAEvaluador:  Date;
  fechaEntregaDeEvaluador: Date;
  fechaCreacion:           Date;
  fechaAprobado:           Date;
  estado:                  number;
  autores:                 IUser[];
  evaluadores:             IUser[];
  directores:              IUser[];
}
