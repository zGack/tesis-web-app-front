import { getTrabajoDeGradoBySlug } from "@/actions";
import { getAnteproyectoBySlug } from "@/actions/anteproyectos/get-anteproyecto-by-slug";
import { auth } from "@/auth.config";
import AnteproyectoForm from "@/components/anteproyectos/form/AnteproyectoForm";
import TrabajoDeGradoForm from "@/components/trabajosDeGrado/form/TrabajoDeGradoForm";
import { redirect, useSearchParams } from "next/navigation";

interface Props {
  searchParams: { [key: string]: string | undefined }
}

export default async function TrabajoDeGradoCreacionPage({ searchParams }: Props) {

  const { anteproyecto: slug } = searchParams;
  const session = await auth();

  if ( !session?.user ) {
    redirect('/login');
  }

  if ( !session!.user.role.includes('admin') || !slug ) {
    redirect('/trabajos-de-grado')
  }

  const anteproyecto = await getAnteproyectoBySlug(slug);

  if ( !anteproyecto ) {
    redirect('/trabajos-de-grado')
  }

  const trabajoDeGrado = await getTrabajoDeGradoBySlug('new');
  
  const filteredUsers = anteproyecto.users.filter(({role}) => !role.includes('evaluador'));
  const users = filteredUsers.map(({id, name, lastname, email, role}) => ({ id, fullname: name+' '+lastname, email, role}))

  return (
    <>
      <TrabajoDeGradoForm trabajoDeGrado={trabajoDeGrado ?? {titulo: anteproyecto.titulo, anteproyectoId: anteproyecto.id}} users={users} creacion={true} />
    </>
  )

}

