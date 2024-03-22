'use client'

import { createUpdateTrabajoDeGrado } from "@/actions";
import { AddUserType } from "@/components/anteproyectos";
import { AddUserDialog, DatepickerInput, FormSection } from "@/components/projects";
import { DangerAlert, SuccessAlert } from "@/components/ui";
import { TrabajoDeGrado, ValidGrades } from "@/interfaces/trabajoDeGrado";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ValidRoles } from '../../../interfaces/user.interface';
import { deleteTrabajoDeGrado } from "@/actions/trabajosDeGrado/delete-trabajo-de-grado";

type TrabajoDeGradoFormData = {
  periodo:                 string;
  titulo:                  string;
  notaDefinitiva:          string | null;
  noAct:                 number;
  mensionHonor:            string;
  gradoPostular:           string;
  fechaSustentacion:       Date | null;
  fechaCreacion:           Date;
  users: {
    id: string,
    fullname: string;
    email: string;
    role: Role[];
  }[];
}

interface Props {
  trabajoDeGrado: Partial<TrabajoDeGrado>;
  users: {
    id: string;
    fullname: string;
    email: string;
    role: Role[];
  }[];
  creacion?: boolean;
}

const TrabajoDeGradoForm = ({ trabajoDeGrado, users, creacion = false }: Props) => {

  const router = useRouter();


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TrabajoDeGradoFormData>({
    defaultValues: {
      ...trabajoDeGrado,
      periodo: `${new Date().getFullYear()}-${(new Date().getMonth() <= 6)?'1':'2'}`,
      users: [...users],
      mensionHonor: trabajoDeGrado.mensionHonor ? 'SI': 'NO',
      notaDefinitiva: trabajoDeGrado.notaDefinitiva?.toString()
    }
  });

  const {
    fields: usersFields,
    append: appendUsers,
    remove: removeUsers,
  } = useFieldArray({
    name: "users",
    keyName: "fieldId",
    control,
  })

  const [ isOpen, setIsOpen ] = useState(false);
  const [ userType, setUserType ] = useState<Role | undefined>();
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ showErrorAlert, setShowErrorAlert ] = useState(false);
  const [ successMsg, setSuccessMsg ] = useState('');
  const [ showSuccessAlert, setShowSuccessAlert ] = useState(false);

  const openAddUserModal = (userRole: Role) => {
    setUserType(`${userRole}`);
    setIsOpen(true);
  };

  const onAddUser = (user: AddUserType) => {
    appendUsers(user);
  }

  const onSubmitTrabajoDeGrado = async ( data: TrabajoDeGradoFormData ) => {
    setShowErrorAlert(false);


    if ( data.titulo === '') {
      setErrorMsg('El campo titulo es obligatorio');
      setShowErrorAlert(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    const hasAuthors = data.users.some( user => user.role.includes('estudiante'));

    if ( !hasAuthors ) {
      setErrorMsg('Debe ingresar al menos un autor.');
      setShowErrorAlert(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    const trabajoDeGradoToSubmit = {
      ...data,
      id: trabajoDeGrado.id,
      users: data.users.map(({id, role}) => ({id, role: role[0]})),
      periodo: trabajoDeGrado.periodo ?? `${new Date().getFullYear()}-${(new Date().getMonth() <= 6)?'1':'2'}`,
      slug: trabajoDeGrado.slug ?? data.titulo.toLowerCase().replace(/ /g, '-' ).trim(),
      mensionHonor: data.mensionHonor === 'SI' ? true : false,
      notaDefinitiva: data.notaDefinitiva === '' ? null : Number(data.notaDefinitiva),
    };

    const response = await createUpdateTrabajoDeGrado(JSON.stringify(trabajoDeGradoToSubmit));

    if ( !response?.ok ) {
      setErrorMsg(`Ocurrió un problema al ${ creacion ? 'crear':'guardar'} el trabajo de grado.`);
      setShowErrorAlert(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState(null,'','/trabajos-de-grado');
    router.replace(`/trabajo-de-grado/${trabajoDeGradoToSubmit.slug}`);
  }

  const onDeleteTrabajoDeGrado = async () => {

    const response = await deleteTrabajoDeGrado(trabajoDeGrado.id!);

    if ( !response?.ok ) {
      setErrorMsg(`Ocurrió un problema al borrar el trabajo de grado.`);
      setShowErrorAlert(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    router.push(`/trabajos-de-grado`);
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
          {
            showSuccessAlert &&
            <SuccessAlert msg={successMsg} onCloseClickBtn={setShowSuccessAlert} />
          }
          {
            showErrorAlert &&
            <DangerAlert msg={errorMsg} onCloseClickBtn={setShowErrorAlert} />
          }
          <form onSubmit={handleSubmit(onSubmitTrabajoDeGrado)} noValidate>
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
                    data-cy="acta"
                    className="block max-w-[90px] rounded-none rounded-r-sm outline-gray-400 bg-gray-50 border text-gray-900 flex-1 text-sm border-gray-300 p-2.5" 
                    placeholder="Acta Nro." 
                    { ...register("noAct", {
                      required: true
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
                      required: true
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
                  name="fechaCreacion"
                  rules={{ required: true }}
                  defaultValue={new Date()}
                  render={({ field: { onChange, value } }) => (
                    <DatepickerInput
                      datepickerName="Fecha de creación"
                      date={value}
                      setDate={onChange}
                    />
                  )}
                />

                {/* Fecha Sustentacion */}
                <Controller
                  control={control}
                  name="fechaSustentacion"
                  rules={{required: false}}
                  defaultValue={null}
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
                      { ...register("gradoPostular", {
                        required: true
                      })}
                    >
                      <option value={'pregrado'}>Pregrado</option>
                      <option value={'maestria'}>Maestría</option>
                      <option value={'especializacion'}>Especialización</option>
                      <option value={'doctorado'}>Doctorado</option>
                    </select>
                  </div>
                </div>
              </div>  

              {/* Campo Titulo Trabajo de Grado */}
              <FormSection title="Título Trabajo de Grado" showAddBtn={false}>
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
                buttonAlias="Autor"
                onAddBtnClick={() => openAddUserModal("estudiante")}
              >
                <div className="grid gap-3">
                  { usersFields.some((field) => field.role.includes('estudiante')) &&
                    <div className="flex flex-row gap-x-2 items-baseline">
                      <label className="w-full text-sm font-medium text-gray-700">
                        Nombre Completo
                      </label>
                      <label className="w-full text-sm font-medium text-gray-700">
                        Correo
                      </label>
                      <div className="font-medium p-1 text-transparent max-w-fit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mr-1 w-6 h-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  }
                  {usersFields.map(
                    (field, index) =>
                      field.role.includes("estudiante") && (
                        <div className="flex flex-row gap-x-2" key={field.id}>
                          <input
                            type="text"
                            readOnly
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                            placeholder="Nombre completo"
                            {...register(`users.${index}.fullname`, {
                              required: true,
                            })}
                          />
                          <input
                            type="text"
                            readOnly
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 "
                            placeholder="Correo"
                            {...register(`users.${index}.email`, {
                              required: true,
                            })}
                          />
                          <button
                            type="button"
                            className="font-medium p-1 outline-red-700 text-red-700 hover:text-red-900 inline-flex max-w-fit items-center text-center capitalize"
                            onClick={() => removeUsers(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="mr-1 w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      )
                  )}
                </div>
              </FormSection>
              
              {/* Campo Director */}
              <FormSection
                title="Directores"
                buttonAlias="Director"
                onAddBtnClick={() => openAddUserModal("director")}
              >
                <div className="grid gap-3">
                  { usersFields.some((field) => field.role.includes('director')) && 
                    <div className="flex flex-row gap-x-2 items-baseline">
                      <label className="w-full text-sm font-medium text-gray-700">
                        Nombre Completo
                      </label>
                      <label className="w-full text-sm font-medium text-gray-700">
                        Correo
                      </label>
                      <div className="font-medium p-1 text-transparent max-w-fit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mr-1 w-6 h-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  }
                  {usersFields.map(
                    (field, index) =>
                      field.role.includes("director") && (
                        <div className="flex flex-row gap-x-2" key={field.id}>
                          <input
                            type="text"
                            readOnly
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                            placeholder="Nombre completo"
                            {...register(`users.${index}.fullname`, {
                              required: true,
                            })}
                          />
                          <input
                            type="text"
                            readOnly
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 "
                            placeholder="Correo"
                            {...register(`users.${index}.email`, {
                              required: true,
                            })}
                          />
                          <button
                            type="button"
                            className="font-medium p-1 outline-red-700 text-red-700 hover:text-red-900 inline-flex max-w-fit items-center text-center capitalize"
                            onClick={() => removeUsers(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="mr-1 w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      )
                  )}
                </div>
              </FormSection>

              {/* Campo Jurado */}
              <FormSection
                title="Jurados"
                buttonAlias="Jurado"
                onAddBtnClick={() => openAddUserModal("jurado")}
              >
                <div className="grid gap-3">
                  { usersFields.some((field) => field.role.includes('jurado')) && 
                    <div className="flex flex-row gap-x-2 items-baseline">
                      <label className="w-full text-sm font-medium text-gray-700">
                        Nombre Completo
                      </label>
                      <label className="w-full text-sm font-medium text-gray-700">
                        Correo
                      </label>
                      <div className="font-medium p-1 text-transparent max-w-fit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mr-1 w-6 h-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  }
                  {usersFields.map(
                    (field, index) =>
                      field.role.includes("jurado") && (
                        <div className="flex flex-row gap-x-2" key={field.id}>
                          <input
                            type="text"
                            readOnly
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                            placeholder="Nombre completo"
                            {...register(`users.${index}.fullname`, {
                              required: true,
                            })}
                          />
                          <input
                            type="text"
                            readOnly
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 "
                            placeholder="Correo"
                            {...register(`users.${index}.email`, {
                              required: true,
                            })}
                          />
                          <button
                            type="button"
                            className="font-medium p-1 outline-red-700 text-red-700 hover:text-red-900 inline-flex max-w-fit items-center text-center capitalize"
                            onClick={() => removeUsers(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="mr-1 w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      )
                  )}
                </div>
              </FormSection>
            </div>
            <div className="flex justify-between mt-6">
              <div>
              { !creacion &&
                <button
                  className="text-white bg-red-700 hover:bg-red-800 outline-red-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
                  type="button"
                  onClick={() => onDeleteTrabajoDeGrado()}
                  data-cy="borrar-trabajo"
                >
                  Borrar
                </button>
              }
              </div>
              <div className="flex gap-x-2">
                <button
                  className="text-white bg-gray-500 hover:bg-gray-600 outline-gray-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                  onClick={() => router.back()}
                >
                  Volver
                </button>
                <button
                  className="text-white bg-sky-700 hover:bg-sky-800 outline-sky-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
                  type="submit"
                  data-cy="create-trabajo-de-grado-btn"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <AddUserDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        usersFields={usersFields}
        userType={userType}
        onAddUser={onAddUser}
      />
    </main>
  )
}

export default TrabajoDeGradoForm;
