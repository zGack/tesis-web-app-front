import { createColumnHelper } from "@tanstack/react-table";

import AuthorsCell from "@/components/projects/AuthorsCell";
import { TrabajoDeGrado } from "@/interfaces/trabajoDeGrado";

const columnHelper = createColumnHelper<TrabajoDeGrado>();

export const TrabajoDeGradoTableColumns = [
  columnHelper.accessor("users", {
    header: "Autor/Autores",
    enableSorting: false,
    cell: (props) => <AuthorsCell authors={props.getValue()} />
  }),  
  columnHelper.accessor("titulo", {
    header: "Título",
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("fechaSustentacion", {
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
