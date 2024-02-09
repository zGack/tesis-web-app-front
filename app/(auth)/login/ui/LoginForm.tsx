'use client';

import { authenticate } from "@/actions";
import Link from "next/link";
import { useFormState, useFormStatus } from 'react-dom';
import { DangerAlert } from "@/components/ui";
import { useEffect, useState } from "react";

type FormData = {
  email: string;
  password: string;
}

export const LoginForm = () => {

  const [ state, dispatch ] = useFormState(authenticate, undefined);
  const [ showErrorAlert, setShowErrorAlert ] = useState(true);

  useEffect(() => {
    if ( state === 'success') {
      window.location.replace('/')
    }
  }, [state]);

  return (
    <div className="flex justify-center self-start w-full z-10">
      <div className="flex flex-col px-3 pt-4 pb-3 bg-white text-black rounded-sm max-w-sm w-full shadow-sm">
        <h2 className="flex text-xl font-semibold">Iniciar sesión</h2>
        <hr className="h-px mb-6 mt-1 bg-gray-300 border-0 "></hr>
        {
          state === 'CredentialsSignin' &&
          <DangerAlert msg="Correo y/o contraseña incorrectas." onCloseClickBtn={setShowErrorAlert} showCancelBtn={false} />
        }
        <form className="flex flex-col" action={dispatch}>
          <input 
            data-cy="email-input"
            type="email" 
            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 mb-3" 
            placeholder="Correo Institucional" 
            name="email" 
          />
          <input 
            data-cy="password-input"
            type="password" 
            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
            placeholder="Contraseña" 
            name="password"
          />
          <div className="flex justify-end mt-6 items-center">
            <Link href={'/registro'} className="mr-2 text-md hover:underline" data-cy="register-button" >
              Crear cuenta
            </Link>
            <LoginButton />
          </div>
        </form>
      </div>
    </div>

  )
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      className={`text-white ${pending? 'bg-sky-800':'bg-sky-700'} hover:bg-sky-800 outline-sky-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center `}
      type="submit"
      data-cy="login-button" 
      disabled={pending}
    >
      {
        pending ? (
          <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>
        ) : (
          'Iniciar Sesión'
        )
      }
    </button>
  )

}