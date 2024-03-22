
import { Fragment } from 'react'
import { useRouter } from 'next/navigation';

import { Dialog, Transition } from "@headlessui/react";

import { STATUS_BADGES, StatusBadge } from "..";
import { DialogDateBox, DialogLabelBox, DialogSection } from "./Dialog";
import { Anteproyecto, User } from '@/interfaces';
import Link from 'next/link';

interface Props {
  project: Anteproyecto;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: Partial<User>
}

export const AnteproyectoTableDialog = ({ 
    project,
    isOpen,
    setIsOpen,
    user,
  }: Props) => {
    
  const router = useRouter();

  if ( !project ) { return (<></>)};

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
                  <div className="flex flex-row justify-between items-center">
                    <div>
                      Anteproyecto
                    </div>
                    {
                      ( project.estado === 1 && user.role!.includes('admin') ) &&
                      <Link href={`/trabajo-de-grado/creacion?anteproyecto=${project.slug}`} className="text-sm text-javeriana-blue-600 hover:underline" data-cy="create-btn">
                        Crear Trabajo de Grado
                      </Link>
                    }
                  </div>
                  <p className="text-base font-normal mt-3">{project.titulo}</p>
                </Dialog.Title>
                <div className="mt-2">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-row justify-between items-start">

                      {/* Nro Radicado */}
                      <DialogLabelBox label="Nro. Radicado">
                        {project.noRadicacion} 
                      </DialogLabelBox>

                      {/* Fechas */}
                      <DialogDateBox
                        title="Fecha de creación"
                        date={project.fechaCreacion}
                      />
                      <DialogDateBox
                        title="Fecha de aprobación"
                        date={project.fechaAprobacion}
                      />

                      {/* Estado */}
                      <DialogLabelBox label="Estado">
                        <StatusBadge badgeType={STATUS_BADGES[project.estado-1]} />
                      </DialogLabelBox> 
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
                    
                    {/* Evaluador */}
                    <DialogSection 
                      users={project.users}
                      title="Evaluador"
                      pluralTitle="Evaluadores"
                      role='evaluador'
                    />
                    
                    {/* Entregas */}
                    <div className="flex flex-col">
                      <h3 className="text-md font-semibold leading-6">Entregas</h3>
                      <hr className="h-px mb-3 mt-1 bg-gray-300 border-0 "></hr>
                      <div className="grid grid-cols-5 gap-y-4 pl-3">
                        {
                          project.noEntrega === 0 
                          ? (
                            <p className="mx-auto col-span-5 italic text-sm">No se han radicado entregas</p>
                          )
                          : (
                            <>
                              <DialogLabelBox
                                label="Entrega #"
                              >
                                { project.noEntrega }
                              </DialogLabelBox> 
                              <div className='col-span-2'>
                                <DialogDateBox
                                  date={project.fechaEntregaAEvaluador}
                                  title="Fecha de entrega al evaluador"
                                />
                              </div>
                              <div className='col-span-2'>
                                <DialogDateBox
                                  date={project.fechaEntregaDeEvaluador}
                                  title="Fecha de respuesta del evaluador"
                                />
                              </div>
                            </>
                          )
                        }
                      </div>
                    </div>

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
                      onClick={() => router.push(`/anteproyecto/${project.slug}`)}
                      data-cy="ver-anteproyecto"
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
