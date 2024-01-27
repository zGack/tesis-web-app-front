import { user } from "@/data/anteproyecto";

interface Props {
  authors: user[];
}

const AuthorsCell = ({ authors }: Props) => {
  
  return (
    <div className="flex flex-col items-start text-gray-900 whitespace-nowrap">
      { authors.map( (author, idx) => 
        <div className="pl-3 mb-3" key={idx}>
          <div className="text-base font-semibold">{author.name}</div>
          <div className="font-normal text-gray-500">{author.email}</div>
        </div>
        )
      }
    </div>
  )
}

export default AuthorsCell;