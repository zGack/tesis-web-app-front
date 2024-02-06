'use client';

import { Fragment, useState } from 'react'

import { Combobox, Dialog, Transition } from "@headlessui/react";

import { Role, User } from '@/interfaces';
import { getUsersByFullName } from '@/actions/users/get-users-by-name';
import { AddUserType, AnteproyectoFormData } from '../anteproyectos/form/AnteproyectoForm';
import { FieldArrayWithId } from 'react-hook-form';
import { DangerAlert } from '../ui';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  usersFields: FieldArrayWithId<AnteproyectoFormData, "users", "id">[];
  userType: Role | undefined;
  onAddUser: (user: AddUserType) => void;
}

const initialUserValue: User = {
  id: '',
  name: '',
  lastname: '',
  email: '',
  password: '',
  active: true,
  role: []
}

export const AddUserDialog = ({ 
    isOpen,
    setIsOpen,
    usersFields = [],
    userType,
    onAddUser
  }: Props) => {
    
  const [ selectedUser, setSelectedUser ] = useState<User>(initialUserValue);
  const [ usersFounded, setUsersFounded ] = useState<User[]>([]);
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ showErrorAlert, setShowErrorAlert ] = useState(false);

  const onSearchUserChange = ( name: string ) => {
    if ( name.length < 1 || userType === undefined){
      setSelectedUser(initialUserValue)
      setUsersFounded([]);
      return;
    } 

    const userByFullname = getUsersByFullName(name, userType);

    userByFullname.then(({users}) => {
      setUsersFounded([...users]);
    });
  }

  const handleAddUser = () => {
    if (userType === undefined) return;

    if (selectedUser.name.length < 1 || selectedUser.lastname.length < 1) {
      setErrorMsg('Debe seleccionar un usuario.')
      setShowErrorAlert(true);
      return;
    };

    const userAlreadyAdded = usersFields.some( field => field.id === selectedUser.id );

    if ( userAlreadyAdded ) {
      setErrorMsg('El usuario ya ha sido agregado.')
      setShowErrorAlert(true);
      setSelectedUser(initialUserValue);
      return;
    }
    setShowErrorAlert(false);

    const user: AddUserType = {
      id: selectedUser.id, 
      fullname: `${selectedUser.name} ${selectedUser.lastname}`,
      email: selectedUser.email,
      role: [userType]
    };
    onAddUser(user);
    handleCloseDialog();
  }
  
  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedUser(initialUserValue);
  }

  return (
    (userType !== undefined) &&
    (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => handleCloseDialog()}>
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
                  {`Seleccionar ${userType.charAt(0).toUpperCase()+userType.slice(1)}`}
                </Dialog.Title>
                <div className="mt-2">

                  {
                    showErrorAlert &&
                    (<DangerAlert msg={errorMsg} onCloseClickBtn={setShowErrorAlert} />)
                  }                 

                  <Combobox value={selectedUser} onChange={setSelectedUser}>
                  {({ open }) => (
                      <div className="relative mt-1">
                        <div className="relative">
                          <Combobox.Input 
                            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                            onChange={(event) => onSearchUserChange(event.target.value)}
                            placeholder={`Buscar ${userType} por nombre`}
                            autoComplete="off"
                            displayValue={(user: User) => ((user.name.length > 0)? `${user.name} ${user.lastname}`:'')}
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
                            {open ?(
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                              </svg>
                            )
                            :(
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                            )}
                          </Combobox.Button>
                        </div>
                        {open && (
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => onSearchUserChange('')}
                          >
                            <Combobox.Options
                              className="mt-1 max-h-60 overflow-auto w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                              static
                            >
                              {
                                (usersFounded.length === 0 && selectedUser === initialUserValue) ? (
                                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    No se encontraron usuarios.
                                  </div>
                                ) : (
                                usersFounded.map((user: User) => (
                                  <Combobox.Option key={user.id} value={user} className="cursor-default hover:cursor-pointer select-none py-2 pr-4">
                                    <div className="pl-3">
                                      <p className="text-base font-medium">{`${user.name} ${user.lastname}`}</p>
                                      <p className="font-normal text-gray-500">{user.email}</p>
                                    </div>
                                  </Combobox.Option>
                                )
                              ))}
                            </Combobox.Options>
                          </Transition>
                        )}
                      </div>
                    )}
                  </Combobox>
                  <div className="flex justify-end mt-4 space-x-3">
                    <button 
                      className="text-white bg-gray-500 hover:bg-gray-600 outline-gray-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center" 
                      type="button" 
                      onClick={() => handleCloseDialog()}
                    >
                        Cerrar
                    </button>
                    <button 
                      className="text-white bg-sky-700 hover:bg-sky-800 outline-sky-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
                      type="button" 
                      onClick={() => handleAddUser()}
                    >
                      Agregar
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
  )
}
