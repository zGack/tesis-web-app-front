import { createColumnHelper } from "@tanstack/react-table";

import { StatusCell } from "@/components/projects";
import AuthorsCell from "@/components/projects/AuthorsCell";
import { Anteproyecto } from "@/interfaces/anteproyecto";


const columnHelper = createColumnHelper<Anteproyecto>();

export const AnteproyectoTableColumns = [
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
  columnHelper.accessor("fechaCreacion", {
    header: "Fecha Creado",
    cell: (props) => <p>{props.getValue().toLocaleDateString("en-GB")}</p>,
  }),
  columnHelper.accessor("fechaAprobacion", {
    header: "Fecha Aprobado",
    cell: (props) => (
      <p>
        {props.getValue()
          ? props.getValue()?.toLocaleDateString("en-GB")
          : "--/--/---"}
      </p>
    ),
  }),
  columnHelper.accessor("estado", {
    header: "Estado",
    cell: (props) => <StatusCell status={props.getValue()} />,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses: number[]) => {
      // SHOW ALL TABLE ITEMS BEFORE DESELECT FILTERS
      if (filterStatuses.length === 0) return true;

      const status = row.getValue(columnId) as number;
      return filterStatuses.includes(status - 1);
    },
  }),
];
