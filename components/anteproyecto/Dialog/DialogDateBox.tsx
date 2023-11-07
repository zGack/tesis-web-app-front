
interface Props {
  title: string;
  date: string;
}

export const DialogDateBox = ({ title, date }: Props) => {
  return (
    <div className="flex flex-col ">
      <label className="block mb-2 text-sm font-medium text-gray-900">{ title }</label>
      <div className="flex flex-row items-center">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        </span>
        <p className="inline-flex ml-3 font-normal text-gray-700">
          { date }
        </p>
      </div>
    </div>
  )
}
