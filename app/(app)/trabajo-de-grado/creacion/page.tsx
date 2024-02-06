'use client'

import { DatepickerInput, FormSection } from "@/components/projects";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";

type FormData = {
  periodo:                 string;
  titulo:                  string;
  notaDefinitiva:          string;
  actaNro:                 string;
  mensionHonor:            boolean;
  gradoAlQuePostula:       string;
  fechaSustentacion:       Date;
  autores:                 {
    personalId: string,
    fullname:   string,
    email:      string,
  }[];
  jurados:             {
    fullname:   string,
    email:      string,
  }[];
  directores:             {
    fullname:   string,
    email:      string,
  }[];
}

const CreatTrabajoGrado = () => {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      periodo: `${new Date().getFullYear()}-${(new Date().getMonth() <= 6)?'1':'2'}`,
      notaDefinitiva: '4.2',
      autores: [{ personalId: '', fullname: '', email: '' }],
      directores: [{ fullname: '', email: ''}],
      jurados: [{ fullname: '', email: ''}],
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

  const { fields: juradosFields, append: appendJurado, remove: removeJurado } = useFieldArray({
    name: 'jurados',
    control 
  });

  const onCreateTrabajoGrado = ( data: FormData ) => {
    console.log(data);
    
  }

  return (
    <main className="flex justify-center py-8">
      <div className="border-2 border-gray-200 shadow-sm rounded-sm max-w-4xl p-5 flex flex-col grow justify-center" >
        <div>
          <h1 className="font-semibold text-2xl mb-4">Trabajo de Grado</h1>
          <p className="text-md text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum possimus nihil quae. Facere placeat illo voluptate magni necessitatibus deserunt unde debitis eligendi, autem nam delectus provident, dolorem commodi reprehenderit ipsam!</p>
        </div>
        <hr className="h-px my-6 bg-gray-300 border-0 "></hr>
        <div>
          <form onSubmit={handleSubmit(onCreateTrabajoGrado)} noValidate>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row gap-x-3">

                <div className="flex">
                  <label 
                    className="flex-shrink-0 inline-flex whitespace-nowrap items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm max-w-min"
                  >
                    Periodo
                  </label>
                  <input 
                    type="text" 
                    className="block max-w-[80px] rounded-none rounded-r-sm outline-gray-400 bg-gray-50 border text-gray-900 flex-1 text-sm border-gray-300 p-2.5" 
                    placeholder="Periodo" 
                    { ...register('periodo', {
                      required: true
                    })}
                  />
                </div>

                <div className="flex">
                  <label 
                    className="flex-shrink-0 inline-flex whitespace-nowrap items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm max-w-min"
                  >
                    Nota Definitiva
                  </label>
                  <input 
                    type="text" 
                    className="block max-w-[60px] rounded-none rounded-r-sm outline-gray-400 bg-gray-50 border text-gray-900 flex-1 text-sm border-gray-300 p-2.5" 
                    placeholder="Nota" 
                    { ...register('notaDefinitiva', {
                      required: false
                    })}
                  />
                </div>

                <div className="flex">
                  <label 
                    className="flex-shrink-0 inline-flex whitespace-nowrap items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm max-w-min"
                  >
                    Acta Nro.
                  </label>
                  <input 
                    type="text" 
                    className="block max-w-[90px] rounded-none rounded-r-sm outline-gray-400 bg-gray-50 border text-gray-900 flex-1 text-sm border-gray-300 p-2.5" 
                    placeholder="Acta Nro." 
                    { ...register('actaNro', {
                      required: false
                    })}
                  />
                </div>

                <div className="flex">
                  <label 
                    className="flex-shrink-0 inline-flex whitespace-nowrap items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm max-w-min"
                  >
                    Mensión de honor
                  </label>
                  <select 
                    className="block max-w-[100px] rounded-none rounded-r-sm outline-gray-400 bg-gray-50 border text-gray-900 flex-1 text-sm border-gray-300 p-2.5" 
                    defaultValue={"NO"} 
                    defaultChecked
                    {...register("mensionHonor", {
                      required: false
                    })}
                  >
                    <option value="SI">SI</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row gap-x-5">
                {/* Fecha Sustentacion */}
                <Controller
                  control={control}
                  name="fechaSustentacion"
                  rules={{required: true}}
                  defaultValue={new Date()}
                  render={({ field: {onChange, value}}) => (
                    <DatepickerInput 
                      datepickerName="Fecha de sustentación" 
                      date={value} 
                      setDate={onChange} 
                    />
                  )}
                />

                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Grado al que se postula</label>
                    <select 
                      className="block min-w-fit rounded-none rounded-r-sm outline-gray-400 bg-gray-50 border text-gray-900 flex-1 text-sm border-gray-300 p-2.5" 
                      defaultValue={"PRE"} 
                      defaultChecked
                      { ...register("gradoAlQuePostula", {
                        required: true
                      })}
                    >
                      <option value="PRE">Pregrado</option>
                      <option value="MAS">Maestría</option>
                      <option value="ESP">Especialización</option>
                      <option value="DOC">Doctorado</option>
                    </select>
                  </div>
                </div>
              </div>  

              {/* Campo Titulo Trabajo de Grado */}
              <FormSection title="Título Trabajo de Grado">
                <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
                  placeholder="Titulo completo del trabajo de grado" 
                  { ...register("titulo",{
                    required: true
                  })}
                />
              </FormSection>

              {/* Campo Autores */}
              <FormSection 
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
              </FormSection>
              
              {/* Campo Director */}
              <FormSection 
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
              </FormSection>

              {/* Campo Jurado */}
              <FormSection 
                title="Jurados" 
                controlFormButtons
                buttonAlias="Jurado"
                onAddBtnClick={() => appendJurado({ fullname: "", email: ""})}
                onRemoveBtnClick={() => removeJurado(juradosFields.length - 1)}
                inputsCount={juradosFields.length}
              >
                <div className="grid gap-3">
                  {
                    juradosFields.map((field, index) => (
                      <div className="grid grid-cols-2 gap-x-2" key={field.id}>
                        <input 
                          type="text" 
                          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
                          placeholder="Nombre completo" 
                          { ...register(`jurados.${index}.fullname`) }
                        />
                        <input 
                          type="text" 
                          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
                          placeholder="Correo" 
                          { ...register(`jurados.${index}.email`) }
                        />
                      </div>
                    ))
                  }
                </div>
              </FormSection>
              
              
            </div>
            <div className="flex justify-end mt-6 gap-x-2">
              <button 
                className="text-white bg-gray-500 hover:bg-gray-600 outline-gray-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center" 
                type="button" 
                onClick={() => router.push('/trabajo-de-grado')}
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

export default CreatTrabajoGrado;
