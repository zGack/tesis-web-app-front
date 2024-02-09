import { ChangeEvent } from 'react';

import { ColumnFilter, ColumnFiltersState } from '@tanstack/react-table';

interface Props {
  columnFilters: ColumnFiltersState;
  setColumnFilters: (prev: any) => void;
}

const UsersTableFilters = ({ 
  columnFilters, 
  setColumnFilters, 
}: Props) => {

  const userName = columnFilters.find((f) => f.id === "name")?.value || "";

  const onSearchInputChange = ({id, value}: ColumnFilter) => setColumnFilters(
    (prev: ColumnFiltersState) => prev.filter(f => f.id !== id).concat({
      id, value
    })
  )

  return (
    <div className="flex space-x-3 items-center">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="text" 
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 hover:border-gray-400 outline-gray-400 rounded-md w-80 bg-gray-50" 
          placeholder={`Buscar Usuarios por nombre`} 
          value={(userName ?? '') as string}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchInputChange({id: "name", value: e.target.value})}
        />
      </div>
    </div>
  )
}

export default UsersTableFilters;