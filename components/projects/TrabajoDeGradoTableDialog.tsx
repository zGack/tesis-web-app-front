import { Fragment } from 'react'
import { useRouter } from 'next/navigation';

import { Dialog, Transition } from "@headlessui/react";

import { STATUS_BADGES, StatusBadge } from "..";
import { DialogDateBox, DialogLabelBox, DialogSection } from "./Dialog";
import { GradesParsed, TrabajoDeGrado } from '@/interfaces/trabajoDeGrado';
import Link from 'next/link';

interface Props {
  project: TrabajoDeGrado;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const TrabajoDeGradoTableDialog = ({ 
    project,
    isOpen,
    setIsOpen,
  }: Props) => {
    
  const router = useRouter();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h2"
                  className="text-xl font-semibold leading-6 text-gray-900 mb-4"
                >
                  Trabajo de Grado
                  <p className="text-base font-normal mt-3">{project.titulo}</p>
                </Dialog.Title>
                <div className="mt-2">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-row gap-x-4 items-start">

                      {/* Periodo */}
                      <DialogLabelBox label="Periodo">
                        {project.periodo} 
                      </DialogLabelBox>

                      {/* Nota Definitva */}
                      <DialogLabelBox label="Nota Definitiva">
                        {project.notaDefinitiva ?? '--'} 
                      </DialogLabelBox>

                      {/* Nro Acta */}
                      <DialogLabelBox label="Nro Acta">
                        {project.noAct} 
                      </DialogLabelBox>

                      {/* Grado al que postula */}
                      <DialogLabelBox label="Grado a postular">
                        {GradesParsed[project.gradoPostular]}
                      </DialogLabelBox>

                    </div>

                    <div className="flex flex-row gap-x-4 items-center">

                      {/* Grado al que postula */}
                      <DialogLabelBox label="Mensión de Honor">
                        {`${(project.mensionHonor)?'SI':'NO'}`} 
                      </DialogLabelBox>

                      {/* Fecha Creacion */}
                      <DialogDateBox
                        title="Fecha de creación"
                        date={project.fechaCreacion}
                      />

                      {/* Fecha Sustentacion */}
                      <DialogDateBox
                        title="Fecha de sustentación"
                        date={project.fechaSustentacion}
                      />
                    </div>
                    
                    {/* Autores */}
                    <DialogSection 
                      users={project.users}
                      title="Autor"
                      pluralTitle="Autores"
                      role='estudiante'
                    />

                    {/* Director */}
                    <DialogSection 
                      users={project.users}
                      title="Director"
                      pluralTitle="Directores"
                      role='director'
                    />
                    
                    {/* Jurados */}
                    <DialogSection 
                      users={project.users}
                      title="Jurado"
                      pluralTitle="Jurados"
                      role='jurado'
                    />
                    
                  </div>

                  <div className="flex justify-end mt-4 space-x-3">
                    <button 
                      className="text-white bg-gray-500 hover:bg-gray-600 outline-gray-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center" 
                      type="button" 
                      onClick={() => setIsOpen(false)}
                    >
                        Volver
                    </button>
                    <button 
                      className="text-white bg-sky-700 hover:bg-sky-800 outline-sky-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
                      type="button" 
                      onClick={() => router.push(`/trabajo-de-grado/${project.slug}`)}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
