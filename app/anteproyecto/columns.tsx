import { createColumnHelper } from "@tanstack/react-table";

import { AnteproyectoTable } from "@/data/anteproyecto";
import { StatusCell } from "@/components/anteproyecto";
import AuthorsCell from "@/components/anteproyecto/AuthorsCell";

const columnHelper = createColumnHelper<AnteproyectoTable>();

export const columns = [
  columnHelper.accessor("autores", {
    header: "Autor/Autores",
    cell: (props) => <AuthorsCell authors={props.getValue()} />
  }),  
  columnHelper.accessor("titulo", {
    header: "Título",
  }),
  columnHelper.accessor("fechaCreacion", {
    header: "Fecha Creado"
  }),
  columnHelper.accessor("fechaAprobacion", {
    header: "Fecha Aprobado",
    cell: (props) => <p>{props.getValue() !== "" ? props.getValue() : '--/--/---' }</p>
  }),
  columnHelper.accessor("estado", {
    header: "Estado",
    size: 200,
    cell: (props) => <StatusCell status={props.getValue()} /> 
  }),
]
