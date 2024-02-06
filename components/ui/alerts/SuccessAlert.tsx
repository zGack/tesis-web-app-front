
interface Props {
  msg: string;
  onCloseClickBtn: (isAlertOpen: boolean) => void;
}

export const SuccessAlert = ({ msg, onCloseClickBtn }: Props) => {
  return (
    <div id="alert-2" className="flex items-center p-4 mb-4 text-green-800 rounded-md bg-green-50" role="alert">
      <div className="text-sm font-medium">
        { msg }
      </div>
      <button 
        type="button" 
        className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-md focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8" 
        data-dismiss-target="#alert-2" 
        aria-label="Close"
        onClick={() => onCloseClickBtn(false)}
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  )
}

