'use client';

import { ValidRoles } from "@/interfaces";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: ValidRoles[];
  anteproyectos: {titulo: string | undefined, slug: string | undefined}[]
  trabajosDeGrado: {titulo: string | undefined, slug: string | undefined}[]
}

const Profile = ({ id, name, lastname, email, role: userRoles, anteproyectos, trabajosDeGrado }: Props) => {

  return (
    <main className="flex justify-center py-8">
      <div className="border-2 border-gray-200 shadow-sm rounded-sm max-w-4xl p-5 flex flex-col grow justify-center" >
        <h1 className="font-semibold text-2xl mb-4">Mi Perfil</h1>
        <hr className="h-px mb-6 bg-gray-300 border-0 "></hr>
        <div className="grid grid-cols-2">
          <div className="flex flex-col space-y-3">
            <div className="mb-1">
              <p className="text-base font-medium">Nombre/s</p>
              <p className="font-normal text-gray-500">{name}</p>
            </div>
            <div className="mb-1">
              <p className="text-base font-medium">Apellidos</p>
              <p className="font-normal text-gray-500">{lastname}</p>
            </div>
            <div className="mb-1">
              <p className="text-base font-medium">Correo</p>
              <p className="font-normal text-gray-500">{email}</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-base font-semibold text-gray-900">{`${userRoles.length > 1 ? 'Roles': 'Rol'}`} de usuario:</p>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
              {
                userRoles.map( (role) => 
                  <li key={role}>{role}</li>
                )
              }
            </ul>
          </div>
          <div className="flex flex-col mt-4">
            <p className="mb-2 text-base font-semibold text-gray-900">Anteproyectos:</p>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside mr-3">
            {
              anteproyectos.map(({titulo, slug}) => (
                <li key={slug}>
                  <Link href={`/anteproyecto/${slug}`} className="font-medium text-javeriana-blue-600 hover:underline" data-cy="create-btn">
                    {titulo}
                  </Link>
                </li>
              ))
            }
            </ul>
          </div>
          <div className="flex flex-col mt-4">
            <p className="mb-2 text-base font-semibold text-gray-900">Trabajos de Grado:</p>
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside mr-3">
            {
              trabajosDeGrado.map(({titulo, slug}) => (
                <li key={slug}>
                  <Link href={`/trabajo-de-grado/${slug}`} className="font-medium text-javeriana-blue-600 hover:underline" data-cy="create-btn">
                    {titulo}
                  </Link>
                </li>
              ))
            }
            </ul>
          </div>
          <div className="flex justify-end col-span-2">
            <Link 
              href="/"
              className="text-white bg-gray-500 hover:bg-gray-600 outline-gray-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center" 
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </main>

  )
}

export default Profile