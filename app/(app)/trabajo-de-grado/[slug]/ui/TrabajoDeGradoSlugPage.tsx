'use client'

import { useRouter } from "next/navigation";

import { DialogDateBox, DialogLabelBox, DialogSection } from "@/components/projects/Dialog";
import { useSession } from "next-auth/react";
import { GradesParsed, TrabajoDeGrado } from "@/interfaces/trabajoDeGrado";

interface Props {
  trabajoDeGrado: TrabajoDeGrado;
}

const TrabajoDeGradoView = ( { trabajoDeGrado }: Props ) => {

  const router = useRouter();
  
  const { data: session } = useSession();

  if ( !session?.user ) {
    router.replace('/login');
  }

  console.log(trabajoDeGrado);

  return (
    <main className="flex justify-center py-8">
      <div className="border-2 border-gray-200 shadow-sm rounded-sm max-w-4xl p-5 flex flex-col grow justify-center" >
        <div>
          <h1 className="font-semibold text-2xl mb-4">Trabajo de Grado</h1>
          <p className="text-md text-gray-700">
            { trabajoDeGrado.titulo }
          </p>
        </div>
        <hr className="h-px my-6 bg-gray-300 border-0 "></hr>
        <div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-wrap justify-start">
                  
                  {/* Periodo */}
                  <div className="mr-4">
                    <DialogLabelBox label="Periodo">
                      {trabajoDeGrado.periodo} 
                    </DialogLabelBox>
                  </div>

                  {/* Nota Definitva */}
                  <div className="mr-4 h-full">
                    <DialogLabelBox label="Nota Definitiva">
                      {trabajoDeGrado.notaDefinitiva ?? '--'} 
                    </DialogLabelBox>
                  </div>

                  <div className="mr-4">
                    <DialogLabelBox label="Mensión de Honor">
                      {trabajoDeGrado.mensionHonor ? 'SI' : 'NO'}
                    </DialogLabelBox>
                  </div>

                  {/* Grado al que postula */}
                  <DialogLabelBox label="Grado a postular">
                    {GradesParsed[trabajoDeGrado.gradoPostular]}
                  </DialogLabelBox>

                  {/* Nro Acta */}
                  <div className="mt-3">
                    <DialogLabelBox label="Nro Acta">
                      {trabajoDeGrado.noAct} 
                    </DialogLabelBox>
                  </div>
              </div>  

              {/* Fechas */}
              <div className="flex flex-row gap-x-3">
                {/* Fechas */}
                <DialogDateBox
                  title="Fecha de Creación"
                  date={trabajoDeGrado.fechaCreacion}
                />
                {/* Fechas */}
                <DialogDateBox
                  title="Fecha de Sustentación"
                  date={trabajoDeGrado.fechaSustentacion}
                />
              </div>

                {/* Autores */}
                <DialogSection
                  users={trabajoDeGrado.users}
                  title="Autor"
                  pluralTitle="Autores"
                  role='estudiante'
                />

                {/* Director */}
                <DialogSection 
                  users={trabajoDeGrado.users}
                  title="Director"
                  pluralTitle="Directores"
                  role='director'
                />
                
                {/* Jurados */}
                <DialogSection 
                  users={trabajoDeGrado.users}
                  title="Jurado"
                  pluralTitle="Jurados"
                  role='jurado'
                />

                <div className="flex flex-col">
                  <h3 className="text-md font-semibold leading-6">Documentos</h3>
                  <hr className="h-px mb-3 mt-1 bg-gray-300 border-0 "></hr>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Documento de Final</label>
                      <input 
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        type="file"
                        accept='.pdf'
                      />
                      <p className="mt-1 text-sm text-gray-500">Solo documentos PDF.</p>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Licencia de Autorización</label>
                      <input 
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        type="file"
                        accept='.pdf'
                      />
                      <p className="mt-1 text-sm text-gray-500">Solo documentos PDF.</p>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Artículo Científico</label>
                      <input 
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        type="file"
                        accept='.pdf'
                      />
                      <p className="mt-1 text-sm text-gray-500">Solo documentos PDF.</p>
                    </div>
                  </div>
                </div>
            </div>

            <div className="flex justify-end mt-6 gap-x-2">
              <button 
                className="text-white bg-gray-500 hover:bg-gray-600 outline-gray-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center" 
                type="button" 
                onClick={() => router.back()}
              >
                  Volver
              </button>
              {
                ( session!.user.role.includes('admin') ) &&
                (
                <button 
                  className="text-white bg-sky-700 hover:bg-sky-800 outline-sky-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
                  type="submit" 
                  onClick={() => router.push(`/trabajo-de-grado/editar/${trabajoDeGrado.slug}`)}
                  data-cy="editar-trabajo"
                >
                    Editar
                </button>
                )
              }
            </div>
        </div>
      </div>
    </main>
  )
}

export default TrabajoDeGradoView;
