import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import Profile from "./ui/Profile";
import { getAnteproyectoByUserId, getTrabajosDeGradoByUserId } from "@/actions";
import { getAnteproyectosByUserId } from "@/actions/anteproyectos/get-anteproyectos-by-userId";

export default async function ProfilePage() {

  const session = await auth();

  if ( !session?.user ) {
    redirect('/login');
  }

  const anteproyectosData = await getAnteproyectosByUserId(session.user.id);
  const trabajosDeGradoData = await getTrabajosDeGradoByUserId(session.user.id);

  return (
    <Profile {...session!.user} anteproyectos={ anteproyectosData!.anteproyectos } trabajosDeGrado={ trabajosDeGradoData!.trabajosDeGrado } />
  )
}
