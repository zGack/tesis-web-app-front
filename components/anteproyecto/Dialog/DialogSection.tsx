import { user } from "@/data/anteproyecto"

interface Props {
  users: user[]
  title: string;
  pluralTitle?: string;
}

export const DialogSection = ({ title, pluralTitle = title , users }: Props) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-md font-semibold leading-6">{(users.length > 1)? pluralTitle : title}</h3>
      <hr className="h-px mb-3 mt-1 bg-gray-300 border-0 "></hr>
      <div className="grid grid-cols-2 gap-4">
      {
        users.length < 1 ?
          <p className="mx-auto col-span-2 italic text-sm">No se han asignado {pluralTitle}</p>
        :
        users.map(({userId, name, lastname, email}) => (
          <div className="" key={userId}>
              <div className="pl-3 mb-1" key={userId}>
                <p className="text-base font-medium">{`${name} ${lastname}`}</p>
                <p className="font-normal text-gray-500">{email}</p>
              </div>
          </div>   
        ))
      }
      </div>
    </div>
  )
}
