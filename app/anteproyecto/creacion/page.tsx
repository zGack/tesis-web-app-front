'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { 
  StatusBadgeListbox, 
  DatepickerInput, 
  AnteproyectoFormSection 
} from "@/components/anteproyecto";
import { STATUS_BADGES, STATUS_BADGE_TYPE } from "@/components";

type FormData = {
  noRadicacion:            string;
  titulo:                  string;
  fechaEntregaAEvaluador:  string;
  fechaEntregaDeEvaluador: string;
  fechaCreacion:           Date;
  fechaAprobado:           Date | null;
  estado:                  STATUS_BADGE_TYPE;
  nroEntrega:              number;
  autores:                 {
    personalId: string,
    fullname:   string,
    email:      string,
  }[];
  evaluadores:             {
    fullname:   string,
    email:      string,
  }[];
  directores:             {
    fullname:   string,
    email:      string,
  }[];
}

const CrearAnteproyecto = () => {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nroEntrega: 0,
      autores: [{ personalId: '', fullname: '', email: '' }],
      directores: [{ fullname: '', email: ''}],
      evaluadores: [{ fullname: '', email: ''}],
    }
  });

  const { fields: autoresFields, append: appendAutores, remove: removeAutores } = useFieldArray({
    name: 'autores',
    control 
  });

  const { fields: directoresFields, append: appendDirector, remove: removeDirector } = useFieldArray({
    name: 'directores',
    control 
  });

  const { fields: evaluadoresFields, append: appendEvaluador, remove: removeEvaluador } = useFieldArray({
    name: 'evaluadores',
    control 
  });

  const onCreateAnteproyecto = ( data: FormData ) => {
    console.log(data);
  }

  const [isApproved, setIsApproved] = useState(false);

  return (
    <main className="flex justify-center py-8">
      <div className="border-2 border-gray-200 shadow-sm rounded-sm max-w-4xl p-5 flex flex-col grow justify-center" >
        <div>
          <h1 className="font-semibold text-2xl mb-4">Anteproyecto</h1>
          <p className="text-md text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum possimus nihil quae. Facere placeat illo voluptate magni necessitatibus deserunt unde debitis eligendi, autem nam delectus provident, dolorem commodi reprehenderit ipsam!</p>
        </div>
        <hr className="h-px my-6 bg-gray-300 border-0 "></hr>
        <div>
          <form onSubmit={handleSubmit(onCreateAnteproyecto)} noValidate>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-between">
                <div className="flex-none max-w-min">
                  <div className="flex">
                    <span 
                      className="inline-flex whitespace-nowrap items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm max-w-min"
                    >
                      Nro. Radicado
                    </span>
                    <input 
                      type="text" 
                      className="rounded-none rounded-r-sm outline-gray-400 bg-gray-50 border text-gray-900 block flex-1 w-full text-sm border-gray-300 p-2.5 min-w-fit" 
                      placeholder="Nro. Radicado" 
                      { ...register('noRadicacion', {
                        required: true
                      })}
                    />
                  </div>
                </div>

                {/* Estado Anteproyecto */}
                <Controller
                  control={control}
                  name="estado"
                  rules={{required: true, onChange: ({target}) => {
                    if (target.value.name === 'aprobado') {
                      setIsApproved(true);
                      setValue('fechaAprobado', new Date());
                      return;
                    }
                    setValue('fechaAprobado',null);
                    setIsApproved(false);
                  }}}
                  
                  defaultValue={STATUS_BADGES[2]}
                  render={({ field: {onChange, value} }) => (
                    <StatusBadgeListbox 
                      selectedStatus={value} 
                      setSelectedStatus={onChange} 
                    />
                  )}
                />
              </div>  

              {/* Fechas */}
              <div className="flex flex-row gap-x-3">
                {/* Fecha Creacion */}
                <Controller
                  control={control}
                  name="fechaCreacion"
                  rules={{required: true}}
                  defaultValue={new Date()}
                  render={({ field: {onChange, value}}) => (
                    <DatepickerInput 
                      datepickerName="Fecha de creación" 
                      date={value} 
                      setDate={onChange} 
                    />
                  )}
                />
                  
                {/* Fecha Aprobacion */}
                {
                  true &&
                  <Controller
                    control={control}
                    name="fechaAprobado"
                    defaultValue={null}
                    render={({ field: {onChange, value}}) => (
                      <DatepickerInput 
                        datepickerName="Fecha de aprobación" 
                        date={value} 
                        setDate={onChange} 
                        minDate={watch('fechaCreacion')}
                      />
                    )}
                  />
                }
              </div>

              {/* Campo Titulo Anteproyecto */}
              <AnteproyectoFormSection title="Título Anteproyecto">
                <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
                  placeholder="Titulo completo del anteproyecto" 
                  { ...register("titulo",{
                    required: true
                  })}
                />
              </AnteproyectoFormSection>

              {/* Campo Autores */}
              <AnteproyectoFormSection 
                title="Autores" 
                controlFormButtons 
                buttonAlias="Autor"
                onAddBtnClick={() => appendAutores({ personalId: "", fullname: "", email: ""})}
                onRemoveBtnClick={() => removeAutores(autoresFields.length - 1)}
                inputsCount={autoresFields.length}
              >
                <div className="grid gap-3">
                {
                  autoresFields.map((field,index) => {
                    return (
                    <div className="grid grid-cols-5 gap-3" key={field.id}>
                        <input 
                          type="text" 
                          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5" 
                          placeholder="Código" 
                          { ...register(`autores.${index}.personalId` as const) }
                        />
                        <input 
                          type="text" 
                          className="col-span-2 bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5" 
                          placeholder="Nombre completo" 
                          { ...register(`autores.${index}.fullname` as const , { required: true }) }
                        />
                        <input 
                          type="text" 
                          className="col-span-2 bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5" 
                          placeholder="Correo" 
                          { ...register(`autores.${index}.email` as const, { required: true }) }
                        />
                    </div>
                    )
                  })
                }
                </div>
              </AnteproyectoFormSection>

              {/* Campo Director */}
              <AnteproyectoFormSection 
                title="Director" 
                controlFormButtons
                onAddBtnClick={() => appendDirector({ fullname: "", email: ""})}
                onRemoveBtnClick={() => removeDirector(directoresFields.length - 1)}
                inputsCount={directoresFields.length}
              >
                <div className="grid gap-3">
                  {
                    directoresFields.map((field, index) => (
                      <div className="grid grid-cols-2 gap-x-2" key={field.id}>
                        <input 
                          type="text" 
                          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
                          placeholder="Nombre completo" 
                          { ...register(`directores.${index}.fullname`, { required: true }) }
                        />
                        <input 
                          type="text" 
                          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
                          placeholder="Correo" 
                          { ...register(`directores.${index}.email`, { required: true }) }
                        />
                      </div>
                    ))
                  }
                </div>
              </AnteproyectoFormSection>

              {/* Campo Evaluador */}
              <AnteproyectoFormSection 
                title="Evaluadores" 
                controlFormButtons
                buttonAlias="Evaluador"
                onAddBtnClick={() => appendEvaluador({ fullname: "", email: ""})}
                onRemoveBtnClick={() => removeEvaluador(evaluadoresFields.length - 1)}
                inputsCount={evaluadoresFields.length}
              >
                <div className="grid gap-3">
                  {
                    evaluadoresFields.map((field, index) => (
                      <div className="grid grid-cols-2 gap-x-2" key={field.id}>
                        <input 
                          type="text" 
                          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
                          placeholder="Nombre completo" 
                          { ...register(`evaluadores.${index}.fullname`) }
                        />
                        <input 
                          type="text" 
                          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
                          placeholder="Correo" 
                          { ...register(`evaluadores.${index}.email`) }
                        />
                      </div>
                    ))
                  }
                </div>
              </AnteproyectoFormSection>

              {/* Campo Entregas */}
              <AnteproyectoFormSection title="Entregas" controlFormButtons buttonAlias="Entrega">
                <div className="flex justify-center">
                  <p className="italic text-sm">
                    No se han radicado entregas
                  </p>
                </div>
              </AnteproyectoFormSection>
              
            </div>

            <div className="flex justify-end mt-6 gap-x-2">
              <button 
                className="text-white bg-gray-500 hover:bg-gray-600 outline-gray-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center" 
                type="button" 
                onClick={() => router.push('/anteproyecto')}
              >
                  Volver
              </button>
              <button 
                className="text-white bg-sky-700 hover:bg-sky-800 outline-sky-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
                type="submit" 
              >
                  Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default CrearAnteproyecto;
