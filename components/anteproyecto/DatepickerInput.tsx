import { LegacyRef, forwardRef } from 'react';

import es from 'date-fns/locale/es';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { RefCallBack } from 'react-hook-form';

interface Props {
  datepickerName: string;
  date?: Date | null;
  minDate?: Date | null;
  setDate: (date: Date | null) => void;
}

registerLocale('es', es);

export const DatepickerInput = ( {datepickerName, date = null, setDate, minDate = null }: Props ) => {

  const CustomDateInput = forwardRef(({ value, onClick }: {value: string, onClick: () => void}, ref: LegacyRef<HTMLButtonElement>) => (
    <button 
      className="flex flex-row text-sm items-center border-gray-300 bg-gray-50 border outline-gray-400 text-gray-900 rounded-sm p-2.5" 
      onClick={onClick} 
      type="button" 
      ref={ref}
    >
      <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      </span>
      { value || '--/--/----' }
    </button>
  ));

  return (
    <div className="flex flex-col max-w-fit">
      <label className="block mb-2 text-sm font-medium text-gray-900">{ datepickerName }</label>
      <div className="relative">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          locale='es'
          minDate={minDate}
          customInput={<CustomDateInput value={""} onClick={() => {}} />}
          />
      </div>
    </div>
  )
}
