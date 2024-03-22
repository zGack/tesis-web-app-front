"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  StatusBadgeListbox,
  DatepickerInput,
  FormSection,
  AddUserDialog,
} from "@/components/projects";
import { STATUS_BADGES, STATUS_BADGE_TYPE } from "@/components";
import { Anteproyecto, Role } from "@/interfaces";
import { createUpdateAnteproyecto } from "@/actions/anteproyectos/create-update-anteproyecto";
import { deleteAnteproyecto } from "@/actions/anteproyectos/delete-anteproyecto";
import { DangerAlert, SuccessAlert } from "@/components/ui";

export type AnteproyectoFormData = {
  noRadicacion: number;
  titulo: string;
  slug: string;
  fechaEntregaAEvaluador: Date | null;
  fechaEntregaDeEvaluador: Date | null;
  fechaCreacion: Date;
  fechaAprobacion: Date | null;
  estado: STATUS_BADGE_TYPE;
  noEntrega: number;
  users: {
    id: string,
    fullname: string;
    email: string;
    role: Role[];
  }[];
};

export type AddUserType = {
  id: string,
  fullname: string;
  email: string;
  role: Role[]
}

interface Props {
  anteproyecto: Partial<Anteproyecto>;
  users: {
    id: string;
    fullname: string;
    email: string;
    role: Role[];
  }[];
  creacion?: boolean;
}

const AnteproyectoForm = ({ anteproyecto, users, creacion = false }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AnteproyectoFormData>({
    defaultValues: {
      ...anteproyecto,
      users: [...users],
      estado: STATUS_BADGES[anteproyecto?.estado! - 1 ?? 2],
    },
  });

  const {
    fields: usersFields,
    append: appendUsers,
    remove: removeUsers,
  } = useFieldArray({
    name: "users",
    keyName: "fieldId",
    control,
  });

  const [ isOpen, setIsOpen ] = useState(false);
  const [ userType, setUserType ] = useState<Role | undefined>();
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ showErrorAlert, setShowErrorAlert ] = useState(false);
  const [ successMsg, setSuccessMsg ] = useState('');
  const [ showSuccessAlert, setShowSuccessAlert ] = useState(false);

  const [ isApproved, setIsApproved ] = useState(false);

  const openAddUserModal = (userRole: Role) => {
    setUserType(`${userRole}`);
    setIsOpen(true);
  };

  const onAddUser = (user: AddUserType) => {
    appendUsers(user);
  }

  const onSubmitAnteproyecto = async (data: AnteproyectoFormData) => {

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

    const anteproyectoToSubmit = {
      ...data,
      id: anteproyecto.id,
      estado: data.estado.id + 1,
      users: data.users.map(({id, role}) => ({id, role: role[0]})),
      noEntrega: anteproyecto.noEntrega ?? 0,
      slug: anteproyecto.slug ?? data.titulo.toLowerCase().replace(/ /g, '-' ).trim(),
      fechaAprobacion: ( isApproved && data.fechaAprobacion === undefined) ? new Date() : data.fechaAprobacion
    };

    const response = await createUpdateAnteproyecto(JSON.stringify(anteproyectoToSubmit));

    if ( !response?.ok ) {
      setErrorMsg(`Ocurrió un problema al ${ creacion ? 'crear':'guardar'} el anteproyecto.`);
      setShowErrorAlert(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState(null,'','/anteproyectos');
    router.replace(`/anteproyecto/${anteproyectoToSubmit.slug}`);
  };

  const onDeleteAnteproyecto  = async () => {

    const response = await deleteAnteproyecto(anteproyecto.id!);

    if ( !response?.ok ) {
      setErrorMsg(`Ocurrió un problema al borrar el anteproyecto.`);
      setShowErrorAlert(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    router.push(`/anteproyectos`);
  }

  return (
    <main className="flex justify-center py-8">
      <div className="border-2 border-gray-200 shadow-sm rounded-sm max-w-4xl p-5 flex flex-col grow justify-center">
        <div>
          <h1 className="font-semibold text-2xl mb-4">Anteproyecto</h1>
          <p className="text-md text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            possimus nihil quae. Facere placeat illo voluptate magni
            necessitatibus deserunt unde debitis eligendi, autem nam delectus
            provident, dolorem commodi reprehenderit ipsam!
          </p>
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
          <form onSubmit={handleSubmit(onSubmitAnteproyecto)} noValidate>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-between">
                <div className="flex-none max-w-min">
                  <div className="flex">
                    <span className="inline-flex whitespace-nowrap items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm max-w-min">
                      Nro. Radicado
                    </span>
                    <input
                      type="text"
                      data-cy="radicado-input"
                      className="rounded-none rounded-r-sm outline-gray-400 bg-gray-50 border text-gray-900 block flex-1 w-full text-sm border-gray-300 p-2.5 min-w-fit"
                      placeholder="Nro. Radicado"
                      {...register("noRadicacion", {
                        required: true,
                      })}
                    />
                  </div>
                </div>

                {/* Estado Anteproyecto */}
                <Controller
                  control={control}
                  name="estado"
                  rules={{
                    required: true,
                    onChange: ({ target }) => {
                      if (target.value.name === "aprobado") {
                        setIsApproved(true);
                        setValue("fechaAprobacion", new Date());
                        return;
                      }
                      setValue("fechaAprobacion", null);
                      setIsApproved(false);
                    },
                  }}
                  defaultValue={STATUS_BADGES[2]}
                  render={({ field: { onChange, value } }) => (
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

                {/* Fecha Aprobacion */}
                {true && (
                  <Controller
                    control={control}
                    name="fechaAprobacion"
                    disabled={isApproved}
                    defaultValue={null}
                    render={({ field: { onChange, value } }) => (
                      <DatepickerInput
                        datepickerName="Fecha de aprobación"
                        date={value}
                        setDate={onChange}
                        minDate={watch("fechaCreacion")}
                        disable={!isApproved}
                      />
                    )}
                  />
                )}
              </div>

              {/* Campo Titulo Anteproyecto */}
              <FormSection title="Título Anteproyecto" showAddBtn={false}>
                <input
                  data-cy="titulo-input"
                  type="text"
                  className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 "
                  placeholder="Titulo completo del anteproyecto"
                  {...register("titulo", {
                    required: true,
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

              {/* Campo Directores */}
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

              {/* Campo Evaluadores */}
              <FormSection
                title="Evaluadores"
                buttonAlias="Evaluador"
                onAddBtnClick={() => openAddUserModal("evaluador")}
              >
                <div className="grid gap-3">
                  { usersFields.some((field) => field.role.includes('evaluador')) && 
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
                      field.role.includes("evaluador") && (
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

              {/* Campo Entregas */}
              <FormSection
                title="Entregas"
                buttonAlias="Entrega"
              >
                <div className="flex justify-center">
                  <p className="italic text-sm">No se han radicado entregas</p>
                </div>
              </FormSection>
            </div>

            <div className="flex justify-between mt-6">
              <div>
              { !creacion &&
                <button
                  className="text-white bg-red-700 hover:bg-red-800 outline-red-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
                  type="button"
                  onClick={() => onDeleteAnteproyecto()}
                  data-cy="delete-anteproyecto-btn"
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
                  data-cy="create-anteproyecto-btn"
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
  );
};

export default AnteproyectoForm;
