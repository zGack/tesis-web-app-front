"use client"

import Image from "next/image"
import Link from "next/link"
import JaveLogo from "@/public/jave-logo.png";
import { usePathname } from "next/navigation";

const navItems = [
  {
    "name": "Inicio",
    "url": "/",
  },
  {
    "name": "Anteproyecto",
    "url": "/anteproyectos",
  },
  {
    "name": "Trabajo de grado",
    "url": "/trabajo-de-grado",
  },
  {
    "name": "Usuarios",
    "url": "/usuarios",
  },
  // {
  //   "name": "Cuenta",
  //   "url": "/",
  // },
]

export const Header = () => {

  const path = usePathname();

  return (
  <nav className="bg-javeriana-blue border-gray-200">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href="/" className="max-w-fit">
        <Image src={JaveLogo} alt="Logo Pontificia Universidad Javeriana Cali"  style={{width: '220px', height: 'auto'}}/>
      </Link>
      {/* <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-dropdown" aria-expanded="false">
          <span className="sr-only">Abrir submenu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button> */}
      <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent ">
          {/* Selected Item CSS */}
          {/* <li>
            <a href="/" className="block py-2 pl-3 pr-4 font-semibold border-b-2 border-javeriana-yellow text-white bg-blue-700 md:bg-transparent md:text-white md:p-0 " aria-current="page">Inicio</a>
          </li> */}
          {
            navItems.map(({name, url}, idx) => (
              <li key={idx}>
                <Link href={url} className={`${path === url ? 'border-b-2 border-javeriana-yellow' : ''} block py-2 pl-3 pr-4 font-semibold text-white rounded hover:bg-gray-100 md:rounded-none md:hover:bg-transparent md:hover:border-javeriana-yellow md:p-0 `}>
                  {name}
                </Link>
              </li>
            ))
          }
          <li>
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" 
              className="flex items-center font-semibold justify-between w-full bottom-2 py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-transparent md:rounded-none md:border-b-2 md:hover:border-javeriana-yellow md:p-0 md:w-auto ">
                Cuenta 
              <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            {/* Dropdown menu */}
            <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownLargeButton">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Settings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Earnings</a>
                  </li>
                </ul>
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Sign out</a>
                </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  )
}
