'use client'

import { useState } from "react";

import { 
  ColumnFiltersState, 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  useReactTable 
} from "@tanstack/react-table";

import { AnteproyectoTable, anteproyectoDataTable } from "@/data/anteproyecto";
import { columns } from './columns';
import { AnteproyectoTableDialog, SearchProjectInput } from "@/components/anteproyecto";

const Anteproyecto = () => {
  const [data, setData] = useState(() => [...anteproyectoDataTable]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<AnteproyectoTable>(data[0]);

  const openModal = (rowData: AnteproyectoTable) => {
    setIsOpen(true);
    setSelectedProject(rowData);
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <main className="flex justify-center w-full my-6">
      <div className="flex flex-col overflow-x-auto shadow-md sm:rounded-lg w-full max-w-7xl p-4">
        <div className="flex items-center justify-between py-4 bg-white">
          <div>
            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-3 py-1.5" type="button">
              <span className="sr-only">Action button</span>
                Action
              <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
          </div>

          <SearchProjectInput columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
        </div>

        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          {
            table.getHeaderGroups().map((headerGroup) => (
              <>
              {console.log(headerGroup.id)}
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map((header) => (
                    <>
                    <th scope="col" className="px-6 py-3 max-w-xs whitespace-nowrap" key={header.id}>
                      {
                        header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                    </th>
                    </>
                  ))
                }
              </tr>
              </>
            ))
          }
          </thead>
          <tbody>
            {
              table.getRowModel().rows.map((row) => (
                <>
                  <tr 
                    className="bg-white border-b max-w-xs hover:bg-gray-50 hover:cursor-pointer" 
                    key={row.id} 
                    // onClick={() => router.push('/anteproyecto/creacion')}
                    onClick={() => openModal(row.original)}
                  >
                    {
                      row.getVisibleCells().map((cell) => (
                        <>
                          <td className="px-6 py-4" key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        </>
                      ))
                    }
                  </tr>
                </>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* Dialog */}
      <AnteproyectoTableDialog isOpen={isOpen} setIsOpen={setIsOpen} project={selectedProject} />
    </main>
  )
}

export default Anteproyecto;