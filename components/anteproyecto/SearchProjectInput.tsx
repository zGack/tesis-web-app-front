import { ColumnFilter, ColumnFiltersState } from "@tanstack/react-table";
import { ChangeEvent } from "react";

interface Props {
  columnFilters: ColumnFiltersState;
  setColumnFilters: (prev: any) => void;
}

export const SearchProjectInput = ({ columnFilters, setColumnFilters }: Props) => {

  const projectTitle = columnFilters.find((f) => f.id === 'titulo')?.value || "";

  const onSearchInputChange = ({id, value}: ColumnFilter) => setColumnFilters(
    (prev: ColumnFiltersState) => prev.filter(f => f.id !== id).concat({
      id, value
    })
  )

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input 
        type="text" 
        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md w-80 bg-gray-50" 
        placeholder="Buscar Anteproyecto" 
        value={(projectTitle ?? '') as string}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchInputChange({id: "titulo", value: e.target.value})}
      />
    </div>
  )
}
