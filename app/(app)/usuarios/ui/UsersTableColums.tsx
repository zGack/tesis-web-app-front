import { createColumnHelper } from "@tanstack/react-table";

import { User } from "@/interfaces";
import { UserTableRoles } from "./UserTableRoles";

const columnHelper = createColumnHelper<User>();

export const UsersTableColumns = [
  columnHelper.accessor("name", {
    header: "Nombre/s",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("lastname", {
    header: "Apellidos",
    enableColumnFilter: true,
    enableSorting: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("email", {
    header: "Correo",
    enableColumnFilter: false,
    enableSorting: false,
  }),
  columnHelper.accessor("role", {
    header: "Roles de Usuario",
    enableColumnFilter: false,
    enableSorting: false,
    cell: (props) => <UserTableRoles roles={props.getValue()} />
    ,
  }),
];
