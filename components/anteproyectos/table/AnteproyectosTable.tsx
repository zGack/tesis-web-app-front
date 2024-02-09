'use client';

import { useState } from "react";
// import { AnteproyectoTableColumns as columns } from "./AnteproyectoTableColumns";
import {
  ColumnFiltersState,
  PaginationState,
  SortDirection, 
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { AnteproyectoTableDialog, TablePagination } from "@/components/projects";
import TableFilters from "@/components/projects/TableFilters";
import { Anteproyecto } from "@/interfaces";
import { AnteproyectoTableColumns } from "./AnteproyectoTableColumns";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Props {
  anteproyectos: Anteproyecto[]
}


export const AnteproyectosTable = ( { anteproyectos }: Props ) => {

  const router = useRouter();
  const { data: session } = useSession();

  if ( !session?.user ) {
    router.replace('/login');
  }

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Anteproyecto>(
    anteproyectos[0]
  );

  const openModal = (rowData: Anteproyecto) => {
    setIsOpen(true);
    setSelectedProject(rowData);
  };

  const table = useReactTable({
    data: anteproyectos,
    columns: AnteproyectoTableColumns,
    initialState: {
      pagination: { pageSize: 5 }, // Numero de anteproyectos por pagina
    },
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  return (
    <main className="flex justify-center w-full my-6">
      <div className="flex flex-col overflow-x-auto shadow-md sm:rounded-lg w-full max-w-7xl p-4 min-h-[275px]">
        {/* TABLE HEADER */}
        <div className="flex items-center justify-between space-x-3 py-4 bg-white">
          <TableFilters
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            showStatusFilter={true}
            placeholderLabel="Anteproyecto"
          />
          
          {
            session?.user.role.includes('admin') &&
            (
              <Link href="/anteproyecto/creacion" className="font-medium text-javeriana-blue-600 hover:underline" data-cy="create-btn">
                Crear Anteproyecto
              </Link>
            )
            
          }
        </div>

        {/* TABLE LAYOUT */}

        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {/* TABLE HEADER */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    scope="col"
                    className="px-6 py-3 max-w-xs whitespace-nowrap"
                    key={header.id}
                  >
                    <div className="flex flex-row items-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() && (
                        <span
                          className="ml-2 hover:cursor-pointer flex flex-row"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {/* Sorting Icons Behaviour */}
                          {header.column.getIsSorted() === false ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                              />
                            </svg>
                          ) : (
                            {
                              asc: (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                                  />
                                </svg>
                              ),
                              desc: (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                                  />
                                </svg>
                              ),
                            }[header.column.getIsSorted() as SortDirection]
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* TABLE BODY */}
          <tbody>
            {
              table.getRowModel().rows.map((row) => (
                <tr
                  className="bg-white border-b max-w-xs hover:bg-gray-50 hover:cursor-pointer"
                  key={row.id}
                  onClick={() => openModal(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td className="px-6 py-4" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>
            
        </table>
        {
          anteproyectos.length < 1 && 
          (
            <div className="flex w-full justify-center my-3">
              <p className="mx-auto col-span-5 italic text-sm">No hay anteproyectos registrados.</p>
            </div>
          )
        }

        {/* TABLE FOOTER */}
        { anteproyectos.length > 0 && 
          (
            <div className="flex flex-row items-center justify-between mt-2">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Anteproyectos:
                <span className="font-semibold text-gray-900 mx-1">
                  {table.getPrePaginationRowModel().rows.length}
                </span>
              </span>

              {/* PAGINATION COMPONENT */}
              <TablePagination
                totalCount={table.getPrePaginationRowModel().rows.length}
                currentPage={table.getState().pagination.pageIndex + 1}
                pageSize={table.getState().pagination.pageSize}
                onNext={table.nextPage}
                canNext={table.getCanNextPage()}
                onPrev={table.previousPage}
                canPrev={table.getCanPreviousPage()}
                onSetPage={table.setPageIndex}
              />
            </div>
          )
        }
      </div>

      {/* Dialog */}
      <AnteproyectoTableDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        project={selectedProject}
      />
    </main>
  );
};
