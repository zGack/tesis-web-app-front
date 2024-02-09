import { getAnteproyectoBySlug } from "@/actions/anteproyectos/get-anteproyecto-by-slug";
import { auth } from "@/auth.config";
import AnteproyectoForm from "@/components/anteproyectos/form/AnteproyectoForm";
import { redirect } from "next/navigation";

export default async function AnteproyectoCreacionPage() {

  const session = await auth();

  if ( !session?.user ) {
    redirect('/login');
  }

  if ( !session!.user.role.includes('admin') ) {
    redirect('/anteproyectos')
  }

  const anteproyecto = await getAnteproyectoBySlug('new');
  
  return (
    <>
      <AnteproyectoForm anteproyecto={anteproyecto ?? {}} users={[]} creacion={true} />
    </>
  )

}
