import { createColumnHelper } from "@tanstack/react-table";

import { TrabajoGradoTable } from "@/data";
import { StatusCell } from "@/components/projects";
import AuthorsCell from "@/components/projects/AuthorsCell";

const columnHelper = createColumnHelper<TrabajoGradoTable>();

export const TrabajoDeGradoColumns = [
  columnHelper.accessor("autores", {
    header: "Autor/Autores",
    enableSorting: false,
    cell: (props) => <AuthorsCell authors={props.getValue()} />
  }),  
  columnHelper.accessor("titulo", {
    header: "Título",
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("fechaSutentacion", {
    header: "Fecha Sustentación",
    cell: (props) => <p>{props.getValue() ? props.getValue()?.toLocaleDateString('en-GB') : '--/--/---' }</p>
  }),
  columnHelper.accessor("periodo", {
    header: "Periodo",
    cell: (props) => <p>{props.getValue()}</p>
  }),
  columnHelper.accessor("notaDefinitiva", {
    header: "Nota Definitiva",
    cell: (props) => <p className="flex justify-center">{props.getValue() ? props.getValue() : '--' }</p>
  }),
]
