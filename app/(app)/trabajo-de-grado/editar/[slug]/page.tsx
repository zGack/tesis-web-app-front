import { getTrabajoDeGradoBySlug } from "@/actions";
import { auth } from "@/auth.config";
import AnteproyectoForm from "@/components/anteproyectos/form/AnteproyectoForm";
import TrabajoDeGradoForm from "@/components/trabajosDeGrado/form/TrabajoDeGradoForm";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string
  }
}

export default async function TrabajoDeGradoEditarPage( {params}: Props ) {

  const session = await auth();

  if ( !session?.user ) {
    redirect('/login');
  }

  if ( !session!.user.role.includes('admin') ) {
    redirect('/trabajos-de-grado')
  }

  const { slug } = params;

  const trabajoDeGrado = await getTrabajoDeGradoBySlug(slug);
  
  const users = trabajoDeGrado?.users.map(({id, name, lastname, email, role}) => ({ id, fullname: name+' '+lastname, email, role}))
  
  return (
    <>
      <TrabajoDeGradoForm trabajoDeGrado={trabajoDeGrado!} users={users ?? []} />
    </>
  )

}