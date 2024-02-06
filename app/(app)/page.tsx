import Link from "next/link";

const menus = [
  {
    "name": "Anteproyectos",
    "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto sapiente similique consectetur repudiandae eveniet rem voluptate quibusdam temporibus illo nulla.",
    "icon": <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />,
    "url": "anteproyecto"
  },
  {
    "name": "Proyectos de Grado",
    "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto sapiente similique consectetur repudiandae eveniet rem voluptate quibusdam temporibus illo nulla.",
    "icon": <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
    "url": "trabajo-de-grado"
  },
  {
    "name": "Usuarios",
    "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto sapiente similique consectetur repudiandae eveniet rem voluptate quibusdam temporibus illo nulla.", 
    "icon": <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    "url": "usuarios"
  },
]

export default function Home() {
  return (
    <main className="flex grow justify-center items-center">
      <div className="flex flex-col max-w-screen-md grow space-y-4"> 
        {
          menus.map(({name, description, url, icon}) => (
            <Link 
              key={name}
              href={url} 
              className="flex flex-row border-2 bg-gray-100 items-center border-gray-500 px-2 rounded-sm hover:cursor-pointer hover:bg-gray-200 hover:border-gray-600 transition-all duration-75"
            >
              <div className="flex h-full items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="text-gray-700 w-24 h-24">
                  {icon}
                </svg>
              </div>
              <div className="my-6 mx-5">
                <h2 className="font-semibold text-4xl text-gray-700 mb-4">{name}</h2>
                <p>{description}</p>
              </div>
            </Link>
          ))
        }
      </div>
    </main>
  )
}
