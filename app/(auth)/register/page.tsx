'use client'

import { AuthContext } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register = () => {

  const { 
    register, 
    handleSubmit, 
    formState: {errors} 
  } = useForm<FormData>();

  const { isLoggedIn, user, loginUser } = useContext( AuthContext );
  const router = useRouter();

  const onRegister = async ({ email, password, passwordConfirm, name, lastname }: FormData) => {

    // const logginSuccessful = await loginUser(email, password);

    // if (!logginSuccessful) {
    //   console.log('an error has ocurred');
    //   return;
    // }

    console.log({ email, password, passwordConfirm, name, lastname });

    router.push('/anteproyecto');
  }

  return (
    <div className="flex justify-center self-start w-full z-10">
      <div className="flex flex-col px-3 pt-4 pb-3 bg-white text-black rounded-sm max-w-sm w-full shadow-sm">
        <h2 className="flex text-xl font-semibold">Crear cuenta</h2>
        <hr className="h-px mb-6 mt-1 bg-gray-300 border-0 "></hr>
        <form className="flex flex-col" onSubmit={handleSubmit(onRegister)}>
          <div className="flex flex-row space-x-2">
            <input 
              type="text" 
              className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 mb-3" 
              placeholder="Nombre" 
              { ...register("name",{
                required: true
              })}
            />
            <input 
              type="text" 
              className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 mb-3" 
              placeholder="Apellido" 
              { ...register("lastname",{
                required: true
              })}
            />
          </div>
          <input 
            type="email" 
            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 mb-3" 
            placeholder="Correo Institucional" 
            { ...register("email",{
              required: true
            })}
          />
          <input 
            type="password" 
            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 mb-3" 
            placeholder="Contraseña" 
            { ...register("password",{
              required: true
            })}
          />
          <input 
            type="password" 
            className="bg-gray-50 border border-gray-300 outline-gray-400 text-gray-900 text-sm rounded-sm block w-full p-2.5 " 
            placeholder="Confirmar contraseña" 
            { ...register("passwordConfirm",{
              required: true
            })}
          />
          <div className="flex justify-end mt-6 items-center">
            <Link href={'/auth/login'} className="mr-2 text-md hover:underline">
              Iniciar sesión
            </Link>
            <button 
              className="text-white bg-sky-700 hover:bg-sky-800 outline-sky-900 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center "
              type="submit" 
            >
                Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;