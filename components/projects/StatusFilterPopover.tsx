import { Menu, Transition } from "@headlessui/react"
import { STATUS_BADGES, STATUS_BADGE_TYPE, StatusBadge } from ".."
import React, { Fragment } from "react"
import { ColumnFilter, ColumnFiltersState } from "@tanstack/react-table";

type Ref = HTMLButtonElement;

interface Props {
  columnFilters: ColumnFiltersState;
  setColumnFilters: (prev: any) => void;
}

interface StatusItemsProps {
  status: STATUS_BADGE_TYPE;
  setColumnFilters: (prev: any) => void;
  isActive: boolean;
}


const StatusItem = React.forwardRef<Ref, StatusItemsProps>(({ status, setColumnFilters, isActive }: StatusItemsProps, ref) => (
  <button 
    ref={ref}
    className={`px-3 py-2 w-full cursor-pointer hover:bg-blue-100 ${isActive ? 'bg-blue-100' : ''}`}
    onClick={() => 
      setColumnFilters(
        (prev: ColumnFiltersState) => {
          const statuses = prev.find((filter) => filter.id === 'estado')?.value as number[];

          if (!statuses) {
            return prev.concat({
              id: 'estado',
              value: [status.id]
            })
          }

          return prev.map(
            filter => filter.id === 'estado' 
            ? {
              ...filter,
              value: isActive 
              ? statuses.filter((s) => s !== status.id)
              : statuses.concat(status.id)
            } 
            : filter
          )
        }
      )
    }
  >
    <StatusBadge badgeType={status} />
  </button>
))


const StatusFilterPopover = ({ columnFilters, setColumnFilters }: Props) => {

  const filterStatuses = columnFilters.find((f) => f.id === "estado")?.value as number[] || [];

  return (
    <>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-300 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filtrar
            <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
          <Menu.Items className="absolute w-fit right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <h6 className="mb-3 text-sm font-medium text-gray-900 px-3 pt-3 whitespace-nowrap">
              Estado Anteproyecto
            </h6>
            {STATUS_BADGES.map((status) => (
              <Menu.Item key={status.name} as={Fragment}>
                <StatusItem
                  status={status}
                  setColumnFilters={setColumnFilters}
                  isActive={filterStatuses.includes(status.id)}
                  key={status.id}
                />
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default StatusFilterPopover