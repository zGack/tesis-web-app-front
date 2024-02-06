import { TableUser } from "@/interfaces";

interface Props {
  authors: TableUser[];
}

const AuthorsCell = ({ authors }: Props) => {
  
  return (
    <div className="flex flex-col items-start text-gray-900 whitespace-nowrap">
      { authors.map( ({name, lastname, email, role}, idx) => 
        (
          role.includes('estudiante') && 
          <div className="pl-3 mb-3" key={idx}>
            <div className="text-base font-semibold">{`${name} ${lastname}`}</div>
            <div className="font-normal text-gray-500">{email}</div>
          </div>
        )
        )
      }
    </div>
  )
}

export default AuthorsCell;