import { getAnteproyectoByUserId, getAnteproyectos } from "@/actions";
import { getUsers } from "@/actions/users/get-users";
import { auth } from "@/auth.config";
import { AnteproyectosTable } from "@/components/anteproyectos";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export default async function Usuarios() {
  const { anteproyectos } = await getAnteproyectos();

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if ( !session.user.role.includes('admin') ) {
    redirect("/");
  }

  const { users } = await getUsers();

  return (
    <>
      <UsersTable users={users} />
    </>
  );
}
