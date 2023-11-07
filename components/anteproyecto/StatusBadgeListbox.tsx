import { Fragment } from "react";

import { Listbox, Transition } from "@headlessui/react";

import { STATUS_BADGES, STATUS_BADGE_TYPE, StatusBadge } from "..";

interface Props {
  selectedStatus: STATUS_BADGE_TYPE;
  setSelectedStatus: (status: STATUS_BADGE_TYPE) => void;
}

export const StatusBadgeListbox = ({selectedStatus, setSelectedStatus}: Props) => {
  return (
    <div className="flex">
      <span className="inline-flex whitespace-nowrap items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm max-w-min">
        Estado
      </span>
      {/* Headless UI Listbox */}
      <div className="relative">
        <Listbox value={selectedStatus} onChange={setSelectedStatus} name="anteproyectoStatus" >
          <Listbox.Button className="relative w-full cursor-pointer border bg-gray-50 border-gray-300 rounded-sm py-2 pl-3 pr-10 text-left outline-gray-400">
            <StatusBadge badgeType={selectedStatus} />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {STATUS_BADGES.map((status) => (
                <Listbox.Option
                  key={status.name}
                  value={status}
                  className={({active}) => 
                    `px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                      active ? 'bg-blue-100' : ''
                    } `
                  }
                >
                  <StatusBadge badgeType={status} />
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
      {/* Headless UI Listbox */}
    </div>
  )
}
