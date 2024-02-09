import { ValidRoles } from "@/interfaces"

interface Props {
  roles: ValidRoles[]
}

export const UserTableRoles = ({roles}: Props) => {
  return (
    <div>
      {roles.map((role, idx) => `${idx === roles.length-1 ? role:`${role}, `} `)}
    </div>
  )
}
