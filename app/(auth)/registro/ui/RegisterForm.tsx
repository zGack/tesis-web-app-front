'use client'

import React, { useState } from 'react'

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { DangerAlert } from '@/components/ui';
import { login, registerUser } from '@/actions';

type FormData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  personalId: string;
}

export const RegisterForm = () => {

  const [ showErrorAlert, setShowErrorAlert ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  const { 
    register, 
    handleSubmit, 
    formState: {errors} 
  } = useForm<FormData>();

  const onRegister: SubmitHandler<FormData> = async ({ email, password, passwordConfirm, name, lastname, personalId }) => {
    setShowErrorAlert(false);

    if ( password !== passwordConfirm ) {
      setErrorMsg('Las contraseñas no coinciden');
      setShowErrorAlert(true);
      return;
    }

    if ( isNaN(Number(personalId)) ) {
      setErrorMsg('La identificacion solo debe contener numeros');
      setShowErrorAlert(true);
      return;
    }

    const resp = await registerUser({personalId: 0, email, password, name, lastname})

    if ( !resp.ok ) {
      setErrorMsg(resp.message ?? 'Error al crear el usuario');
      setShowErrorAlert(true);
      return;
    }

    await login( email.toLowerCase(), password);
    window.location.replace('/');
  }

  const handleFormError = (msg: string) => {
    setErrorMsg(msg);
    setShowErrorAlert(true);
  }
  
  return (
    <>
      {
        showErrorAlert &&
        (
          <DangerAlert msg={errorMsg} onCloseClickBtn={setShowErrorAlert} />
        )
      }
      <form className="flex flex-col" onSubmit={handleSubmit(onRegister)}>
        <div className="flex flex-row space-x-2">
          <input 
            data-cy="name-input"
            type="text" 
            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 mb-3" 
            placeholder="Nombre" 
            { ...register("name",{
              required: true
            })}
          />
          <input 
            data-cy="lastname-input"
            type="text" 
            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 mb-3" 
            placeholder="Apellido" 
            { ...register("lastname",{
              required: true
            })}
          />
        </div>
        <input 
          data-cy="id-input"
          type="text" 
          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 mb-3" 
          placeholder="Identificación" 
          { ...register("personalId")}
        />
        <input 
          data-cy="email-input"
          type="email" 
          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 mb-3" 
          placeholder="Correo Institucional" 
          { ...register("email",{
            required: true,
            pattern: /^\S+@\S+$/i
          })}
        />
        <input 
          data-cy="password-input"
          type="password" 
          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 mb-3" 
          placeholder="Contraseña" 
          { ...register("password",{
            required: true
          })}
        />
        <input 
          data-cy="confirm-password-input"
          type="password" 
          className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
          placeholder="Confirmar contraseña" 
          { ...register("passwordConfirm",{
            required: true
          })}
        />
        <div className="flex justify-end mt-6 items-center">
          <Link 
            href={'/login'} 
            className="mr-2 text-md hover:underline"
          >
            Iniciar sesión
          </Link>
          <button 
            className="text-white bg-sky-700 hover:bg-sky-800 outline-sky-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
            type="submit" 
            data-cy="register-btn"
          >
              Crear cuenta
          </button>
        </div>
      </form>
    </>
  )
}
