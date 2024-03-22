import { Fragment, useState } from 'react'

import { Dialog, Transition } from "@headlessui/react";

import { Anteproyecto, User } from '@/interfaces';
import { DangerAlert } from '@/components/ui';
import { Controller, useForm } from 'react-hook-form';
import { updateAnteproyectoDocuments } from '@/actions';
import { StatusBadgeListbox } from '@/components/projects';
import { DialogDateBox } from '@/components/projects/Dialog';
import { STATUS_BADGES, STATUS_BADGE_TYPE } from '@/components';
import Link from 'next/link';

export type FileDilveryFormData = {
  documento?: FileList;
  correciones?: FileList;
  fechaEntregaAEvaluador: Date | null
  fechaEntregaDeEvaluador: Date | null
  estado: STATUS_BADGE_TYPE;
};

interface Props {
  user: Partial<User>;
  isOpen: boolean;
  anteproyecto: Anteproyecto
  setIsOpen: (value: boolean) => void;
}


export const AnteproyectoFileDeliveryDialog = ({ 
    user,
    anteproyecto,
    isOpen,
    setIsOpen,
  }: Props) => {
    
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ showErrorAlert, setShowErrorAlert ] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<FileDilveryFormData>({
    defaultValues: {
      documento: undefined,
      correciones: undefined,
      fechaEntregaAEvaluador: user.role?.includes('estudiante') ?  new Date() : null,
      fechaEntregaDeEvaluador: user.role?.includes('estudiante') ?  null : new Date()
    },
  });

  const handleSave = async (data: FileDilveryFormData) => {

    setShowErrorAlert(false);

    if ( data.documento?.length === 0 ) {
      setErrorMsg('Debe seleccionar un documento.');
      setShowErrorAlert(true);
      return;
    }
    
    const anteproyectoToSubmit = {
      ...data,
      id: anteproyecto.id,
      estado: anteproyecto.estado + 1,
      noEntrega: anteproyecto.noEntrega + 1,
      // documento: { 
      //   name: data.documento![0].name,
      //   size: data.documento![0].size,
      //   type: data.documento![0].type,
      //   lastModified: data.documento![0].lastModified,
      // }
    };

    const documentsFormData = new FormData();

    documentsFormData.append('documento', data.documento![0]);

    console.log(anteproyectoToSubmit);

    const response = await updateAnteproyectoDocuments(JSON.stringify(anteproyectoToSubmit), documentsFormData);

    // if ( !response?.ok ) {
    //   setErrorMsg(`Ocurrió un problema al guardar el documento.`);
    //   setShowErrorAlert(true);
    //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    //   return;
    // }
    // window.history.pushState(null,'','/anteproyectos');
    // router.replace(`/anteproyecto/${anteproyectoToSubmit.slug}`);
  // };



  }

  if ( !user ) { return (<></>)};

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={() => setIsOpen(false)}>
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
                      {`Radicar Entrega`}
                    </div>
                  </div>
                </Dialog.Title>
                {
                  showErrorAlert &&
                  <DangerAlert msg={errorMsg} onCloseClickBtn={setShowErrorAlert} />
                }
                <div className="mt-2">
                  <form noValidate onSubmit={handleSubmit(handleSave)}>
                    <div className="grid grid-cols-2 mb-3 space-x-3">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Documento de Anteproyecto</label>
                        {
                          (user.role?.includes('estudiante') ||
                          user.role?.includes('admin')
                          ) ?

                          <>
                            <input 
                              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                              type="file"
                              accept='.pdf'
                              {...register('documento')}
                            />
                            <p className="mt-1 text-sm text-gray-500">Solo documentos PDF.</p>
                          </>
                          :
                          <>
                            <Link data-cy="crear-trabajo" href={`/trabajo-de-grado/creacion?anteproyecto=${anteproyecto.slug}`} className="font-medium text-javeriana-blue-600 hover:underline">
                              {anteproyecto.slug}
                            </Link>
                          </>
                        }
                        
                      </div>
                      <div>
                        <DialogDateBox
                          title="Fecha de Entrega a Evaluador"
                          date={new Date()}
                        />
                      </div> 
                    </div>
                    {
                      (user.role?.includes('evaluador') || user.role?.includes('admin')) &&
                      <div className="grid grid-cols-3 mb-3 space-x-3">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900">Correciones</label>
                          <input 
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                            type="file"
                            accept='.pdf'
                            {...register('correciones', {
                              required: false
                            })}
                          />
                          <p className="mt-1 text-sm text-gray-500">Solo documentos PDF.</p>
                        </div>
                        <div>
                          <DialogDateBox
                            title="Fecha de Entrega de Evaluador"
                            date={new Date()}
                          />
                        </div> 
                        <Controller
                          control={control}
                          name="estado"
                          rules={{
                            required: true,
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
                    }
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
                      >
                        Guardar
                      </button>
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
