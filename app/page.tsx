import Link from "next/link";

const menus = [
  {
    "name": "Anteproyectos",
    "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto sapiente similique consectetur repudiandae eveniet rem voluptate quibusdam temporibus illo nulla a eaque neque tempora laborum repellendus, eligendi, accusantium voluptatum quis.",
    "icon": <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />,
    "url": "anteproyecto"
  },
  {
    "name": "Proyectos de Grado",
    "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto sapiente similique consectetur repudiandae eveniet rem voluptate quibusdam temporibus illo nulla a eaque neque tempora laborum repellendus, eligendi, accusantium voluptatum quis.",
    "icon": <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
    "url": "proyecto-de-grado"
  },
  {
    "name": "Estudiantes",
    "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto sapiente similique consectetur repudiandae eveniet rem voluptate quibusdam temporibus illo nulla a eaque neque tempora laborum repellendus, eligendi, accusantium voluptatum quis.", 
    "icon": <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />,
    "url": "estudiantes"
  },
]

export default function Home() {
  return (
    <main className="flex grow justify-center items-center">
      <div className="flex flex-col max-w-screen-lg grow space-y-4"> 
        {
          menus.map(({name, description, url, icon}) => (
            <Link href={url} className="flex flex-row border-2 bg-gray-100 border-gray-500 px-4 rounded-sm hover:cursor-pointer hover:bg-gray-200 hover:border-gray-600 transition-all duration-75">
              <div className="flex h-full items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.3} stroke="currentColor" className="text-gray-700 w-48 h-48">
                  {icon}
                </svg>
              </div>
              <div className="my-10 mx-5">
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
