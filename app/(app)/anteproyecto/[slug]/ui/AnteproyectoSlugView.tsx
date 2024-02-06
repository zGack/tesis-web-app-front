'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { STATUS_BADGES, StatusBadge } from "@/components";
import { Anteproyecto } from "@/interfaces";
import { DialogDateBox, DialogLabelBox, DialogSection } from "@/components/projects/Dialog";

interface Props {
  anteproyecto: Anteproyecto;
}

const AnteproyectoSlugView = ( { anteproyecto }: Props ) => {

  const router = useRouter();
  console.log(anteproyecto);
  

  return (
    <main className="flex justify-center py-8">
      <div className="border-2 border-gray-200 shadow-sm rounded-sm max-w-4xl p-5 flex flex-col grow justify-center" >
        <div>
          <h1 className="font-semibold text-2xl mb-4">Anteproyecto</h1>
          <p className="text-md text-gray-700">
            { anteproyecto.titulo }
          </p>
        </div>
        <hr className="h-px my-6 bg-gray-300 border-0 "></hr>
        <div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-between">
                <div className="flex-none max-w-min">
                  {/* Nro Radicado */}
                  <DialogLabelBox label="Nro. Radicado">
                    {anteproyecto.noRadicacion} 
                  </DialogLabelBox>
                </div>

                {/* Estado */}
                <DialogLabelBox label="Estado">
                  <StatusBadge badgeType={STATUS_BADGES[anteproyecto.estado-1]} />
                </DialogLabelBox>
              </div>  

              {/* Fechas */}
              <div className="flex flex-row gap-x-3">
                {/* Fechas */}
                <DialogDateBox
                  title="Fecha de creación"
                  date={anteproyecto.fechaCreacion}
                />
                <DialogDateBox
                  title="Fecha de aprobación"
                  date={anteproyecto.fechaAprobacion}
                />
              </div>

                {/* Autores */}
                <DialogSection
                  users={anteproyecto.users}
                  title="Autor"
                  pluralTitle="Autores"
                  role='estudiante'
                />

                {/* Director */}
                <DialogSection 
                  users={anteproyecto.users}
                  title="Director"
                  pluralTitle="Directores"
                  role='director'
                />
                
                {/* Evaluador */}
                <DialogSection 
                  users={anteproyecto.users}
                  title="Evaluador"
                  pluralTitle="Evaluadores"
                  role='evaluador'
                />


              {/* Entregas */}
              <div className="flex flex-col">
                <h3 className="text-md font-semibold leading-6">Entregas</h3>
                <hr className="h-px mb-3 mt-1 bg-gray-300 border-0 "></hr>
              {
                (anteproyecto.noEntrega === 0)?
                <div className="flex justify-center">
                  <p className="italic text-sm">
                    No se han radicado entregas
                  </p>
                </div>

                :(
                  <>
                    <div className="grid grid-cols-5 gap-y-4 pl-3">
                      <DialogLabelBox
                        label="Entrega #"
                      >
                        { anteproyecto.noEntrega }
                      </DialogLabelBox> 
                      <div className='col-span-2'>
                        <DialogDateBox
                          date={anteproyecto.fechaEntregaAEvaluador}
                          title="Fecha de entrega al evaluador"
                        />
                      </div>
                      <div className='col-span-2'>
                        <DialogDateBox
                          date={anteproyecto.fechaEntregaDeEvaluador}
                          title="Fecha de respuesta del evaluador"
                        />
                      </div>
                    </div>

                  </>
                )
              }
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-x-2">
              <button 
                className="text-white bg-gray-500 hover:bg-gray-600 outline-gray-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center" 
                type="button" 
                onClick={() => router.push('/anteproyectos')}
              >
                  Volver
              </button>
              <button 
                className="text-white bg-sky-700 hover:bg-sky-800 outline-sky-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
                type="submit" 
                onClick={() => router.push(`/anteproyecto/editar/${anteproyecto.slug}`)}
              >
                  Editar
              </button>
            </div>
        </div>
      </div>
    </main>
  )
}

export default AnteproyectoSlugView;
