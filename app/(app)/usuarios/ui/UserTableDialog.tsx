import { ChangeEvent, Fragment, useState } from 'react'

import { Dialog, Transition } from "@headlessui/react";

import {  User, ValidRoles } from '@/interfaces';
import { DangerAlert } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { createUpdateUser } from '@/actions';
import { deleteUser } from '@/actions/users/delete-user';

export type UserFormData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: ValidRoles[];
  confirmPassword: string;
};

interface Props {
  user: User;
  dialogTitleLabel?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const roles = ['admin', 'director', 'estudiante','jurado', 'evaluador'] as ValidRoles[];

export const UserTableDialog = ({ 
    user,
    isOpen,
    setIsOpen,
    dialogTitleLabel = 'Editar'
  }: Props) => {
    
  const [ checked, setChecked ] = useState<ValidRoles[]>([...user.role]);
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ showErrorAlert, setShowErrorAlert ] = useState(false);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked,event.target.value as ValidRoles];
    } else {
      updatedList.splice(checked.indexOf(event.target.value as ValidRoles),1);
    }
    setChecked(updatedList);
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      ...user,
      password: ''
    },
  });

  const handleSave = async (data: UserFormData) => {
    setShowErrorAlert(false);

    if ( checked.length === 0 ) {
      setErrorMsg('Debe elegir al menos un rol.');
      setShowErrorAlert(true);
      return;
    }

    if ( data.password.length > 0 && data.password !== data.confirmPassword ){
      setErrorMsg('Las contraseñas no coinciden.');
      setShowErrorAlert(true);
      return;
    }

    const userToSubmit = {
      ...data,
      active: true,
      role: [...checked],
      password: data.password.length > 0 ? data.password : null,
      id: user.id.length > 0 ? user.id : null 
    }

    const resp = await createUpdateUser(JSON.stringify(userToSubmit));

    if ( !resp.ok ) {
      setErrorMsg('Error al crear/actualizar el usuario.');
      setShowErrorAlert(true);
      return;
    }

    setIsOpen(false);
  }

  const handleDeleteUser = async () => {
    const resp = await deleteUser(user.id);

    if ( !resp.ok ) {
      setErrorMsg('Error al borrar el usuario.');
      setShowErrorAlert(true);
      return;
    }

    setIsOpen(false);
  }

  if ( !user ) { return (<></>)};

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
                      {`${dialogTitleLabel} Usuario`}
                    </div>
                  </div>
                </Dialog.Title>
                {
                  showErrorAlert &&
                  <DangerAlert msg={errorMsg} onCloseClickBtn={setShowErrorAlert} />
                }
                <div className="mt-2">
                  <form noValidate onSubmit={handleSubmit(handleSave)}>
                    <div className="grid grid-cols-2 mb-3">
                      <div className='flex flex-col space-y-3 me-5'>
                        <div className="mb-1">
                          <p className="text-base font-medium">Nombre/s</p>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                            placeholder="Nombre completo"
                            {...register(`name`, {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="mb-1">
                          <p className="text-base font-medium">Apellidos</p>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                            placeholder="Nombre completo"
                            {...register(`lastname`, {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="mb-1">
                          <p className="text-base font-medium">Correo</p>
                          <input
                            type="email"
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                            placeholder="Nombre completo"
                            {...register(`email`, {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="mb-1">
                          <p className="text-base font-medium">Nueva contraseña</p>
                          <input
                            type="password"
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                            placeholder="Nueva contraseña"
                            {...register(`password`, {
                              validate: (value) => { if (user.id.length < 1 && !value) return 'Campo requerido' }
                            })}
                          />
                        </div>
                        <div className="mb-1">
                          <p className="text-base font-medium">Repetir contraseña</p>
                          <input
                            type="password"
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                            placeholder="Repetir contraseña"
                            {...register(`confirmPassword`, {
                              validate: (value) => { if (getValues('password') && !value) return 'Campo requerido' }
                            })}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-base font-semibold text-gray-900">{`${user.role.length > 1 ? 'Roles': 'Rol'}`} de usuario:</p>
                        <div className='ms-3 space-y-3'>
                          {
                            roles.map( (role) => 
                            <div className="flex items-center" key={role}>
                              <input 
                                type='checkbox' 
                                checked={checked.includes(role)} 
                                value={role} 
                                data-cy={`${role}-role`}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                onChange={handleCheck}
                              />
                              <label className="ms-2 text-sm font-medium text-gray-900">{role}</label>
                            </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-between mt-4'>
                      <div>
                      {
                        (user.id.length > 0) &&
                        <button
                          className="text-white bg-red-700 hover:bg-red-800 outline-red-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
                          type="button"
                          onClick={() => handleDeleteUser()}
                        >
                          Borrar
                        </button>
                      }
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button 
                          className="text-white bg-gray-500 hover:bg-gray-600 outline-gray-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center" 
                          type="button" 
                          onClick={() => setIsOpen(false)}
                        >
                            Volver
                        </button>
                        <button 
                          className="text-white bg-sky-700 hover:bg-sky-800 outline-sky-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
                          type="submit" 
                          data-cy="guardar"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
