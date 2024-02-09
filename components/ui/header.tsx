"use client";

import Image from "next/image"
import Link from "next/link"
import JaveLogo from "@/public/jave-logo.png";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { logout } from "@/actions";
import { useSession } from "next-auth/react";
import { ValidRoles } from "@/interfaces";

const navItems = [
  {
    "name": "Inicio",
    "url": "/",
    "allowedRoles": ['estudiante','director','director','jurado','admin'] as ValidRoles[]
  },
  {
    "name": "Anteproyectos",
    "url": "/anteproyectos",
    "allowedRoles": ['estudiante','director','director','jurado','admin'] as ValidRoles[]
  },
  {
    "name": "Trabajos de grado",
    "url": "/trabajos-de-grado",
    "allowedRoles": ['estudiante','director','director','jurado','admin'] as ValidRoles[]
  },
  {
    "name": "Usuarios",
    "url": "/usuarios",
    "allowedRoles": ['admin'] as ValidRoles[]
  }
]

interface Props {
  currentUserRoles: ValidRoles[]
}

export const Header = ({ currentUserRoles }: Props ) => {

  const path = usePathname();

  return (
  <nav className="bg-javeriana-blue border-gray-200">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href="/" className="max-w-fit">
        <Image src={JaveLogo} alt="Logo Pontificia Universidad Javeriana Cali"  style={{width: '220px', height: 'auto'}}/>
      </Link>
      <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent ">
          {
            navItems.map(({name, url, allowedRoles}, idx) => (
              currentUserRoles?.some( role => allowedRoles.includes(role)) && 
              (
                <li key={idx}>
                  <Link href={url} className={`${path === url ? 'border-javeriana-yellow' : 'border-transparent'} block py-2 pl-3 pr-4 font-semibold text-white border-b-2 md:hover:border-javeriana-yellow md:p-0 `}>
                    {name}
                  </Link>
                </li>
              )
              
            ))
          }
          <li>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center font-semibold justify-between w-full bottom-2 py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-transparent md:rounded-none md:border-b-2 md:hover:border-javeriana-yellow md:p-0 md:w-auto ">
            Cuenta
              <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute flex flex-col right-0 mt-2 origin-top-right font-normal bg-white divide-y divide-gray-100 rounded-sm shadow w-44">
                <div className="py-2 text-sm text-gray-700 flex flex-col">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${active && 'hover:bg-gray-100'} px-2 py-2 flex items-center`}
                        href="/perfil"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        Perfil
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    <button
                      className="px-2 py-2 w-full flex items-center text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => logout()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                      </svg>
                      Salir
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
              </Transition>
          </Menu>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  )
}
