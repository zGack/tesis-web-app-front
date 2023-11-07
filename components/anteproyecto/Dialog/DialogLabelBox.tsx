import { STATUS_BADGES, StatusBadge } from "@/components"

interface Props {
  children: React.ReactNode;
  label: string
}

export const DialogLabelBox = ({ children, label  }: Props) => {
  return (
    <div className="flex h-fit"> 
      <label className="inline-flex whitespace-nowrap items-center px-3 text-sm text-gray-900 font-semibold bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm max-w-min">
        { label }
      </label>
      <span className="rounded-none rounded-r bg-gray-50 border text-gray-900 text-sm font-medium p-2.5 whitespace-nowrap border-gray-300">
        { children }
      </span>
    </div>
  )
}
