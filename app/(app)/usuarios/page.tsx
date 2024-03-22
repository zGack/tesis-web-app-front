import { getUsers } from "@/actions/users/get-users";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export default async function Usuarios() {

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
