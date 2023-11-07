const TrabajoGrado = () => {
  return (

    <main className="flex justify-center py-8">
      <div className="border-2 border-gray-200 shadow-sm rounded-sm max-w-4xl p-5 flex flex-col grow justify-center" >
        <div>
          <h1 className="font-semibold text-2xl mb-4">Trabajo de Grado</h1>
          <p className="text-md text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum possimus nihil quae. Facere placeat illo voluptate magni necessitatibus deserunt unde debitis eligendi, autem nam delectus provident, dolorem commodi reprehenderit ipsam!</p>
        </div>
        <hr className="h-px my-6 bg-gray-300 border-0 "></hr>
        <div>
          <form>
            <div className="flex flex-col space-y-4">
              <div className="flex-none max-w-min">
                  <div className="flex">
                    <span className="inline-flex whitespace-nowrap items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm max-w-min">
                      Periodo
                    </span>
                    <input type="text" id="website-admin" className="rounded-none rounded-r-sm bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 min-w-fit" placeholder="Periodo" value={"2023-2"} />
                  </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex basis-1/2 flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Autor 1</label>
                    <input type="text" id="autor_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nombre completo autor 1" required />
                </div>
                <div className="flex basis-1/2 flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Autor 2</label>
                    <input type="text" id="autor_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nombre completo autor 2" />
                </div>
              </div>
              <div>
                <div className="flex basis-1/2 flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Titulo Anteproyecto</label>
                    <input type="text" id="autor_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Titulo Completo" />
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex basis-1/2 flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Director</label>
                    <input type="text" id="autor_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nombre completo director" required />
                </div>
                <div className="flex basis-1/2 flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Codirector
                    </label>
                    <input type="text" id="autor_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nombre completo codirector" />
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex basis-1/2 flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Jurado 1</label>
                    <input type="text" id="autor_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nombre completo jurado 1" required />
                </div>
                <div className="flex basis-1/2 flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Jurado 2
                    </label>
                    <input type="text" id="autor_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nombre completo Jurado 2" />
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex basis-1/4 flex-col">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Fecha de Sustentacion</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Fecha" value={"08/08/2023"}/>
                  </div>
                </div>
                <div className="flex basis-1/4 flex-col justify-end">
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm">
                      Nota Definitva
                    </span>
                    <input type="text" className="rounded-none rounded-r-sm bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 inline-block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="Nota definitiva" value={4.2} />
                  </div>
                </div>
                <div className="flex basis-1/4 flex-col justify-end">
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm">
                      Acta Nro.
                    </span>
                    <input type="text" className="rounded-none rounded-r-sm bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 inline-block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="Nota definitiva" value={4.2} />
                  </div>
                </div>
                <div className="flex basis-1/4 flex-col justify-end">
                  <div className="flex items-center mb-4">
                      <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 hover:cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                      <label className="ml-2 text-sm font-medium text-gray-900">Mension de Honor</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex basis-1/2 flex-col">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 ">Grado al que se postulo</label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={"PRE"} defaultChecked>
                    <option selected>Seleccione un grado</option>
                    <option value="PRE">Pregrado</option>
                    <option value="MAS">Maestria</option>
                    <option value="ESP">Especializacion</option>
                    <option value="DOC">Doctorado</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="button" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center ">
                  Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default TrabajoGrado;
