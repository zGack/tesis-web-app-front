import React from 'react'

interface Props {
  children: React.ReactNode;
  title: string;
  buttonAlias?: string;
  onAddBtnClick?: () => void;
  showAddBtn?: boolean
}

export const FormSection = ({ children, title, buttonAlias = title, onAddBtnClick, showAddBtn = true }: Props ) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-md font-semibold leading-6">{ title }</h3>
      <hr className="h-px mb-3 mt-1 bg-gray-300 border-0 "></hr>

      { children }
      {
        showAddBtn &&
        <div className='flex mt-2'>
          {/* Add Input Button */}
          <button 
            data-cy={`add-${title}-btn`}
            type="button" 
            className="font-medium p-1 outline-sky-700 text-sky-700 hover:text-sky-900 inline-flex max-w-fit items-center text-center capitalize"
            onClick={onAddBtnClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Agregar { buttonAlias }
          </button>
        </div>
      }
    </div>
  )
}
