import { getAnteproyectoBySlug } from "@/actions/anteproyectos/get-anteproyecto-by-slug";
import { auth } from "@/auth.config";
import AnteproyectoForm from "@/components/anteproyectos/form/AnteproyectoForm";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string
  }
}

export default async function AnteproyectoEditarPage( {params}: Props ) {

  const session = await auth();

  if ( !session?.user ) {
    redirect('/login');
  }

  if ( !session!.user.role.includes('admin') ) {
    redirect('/anteproyectos')
  }

  const { slug } = params;

  const anteproyecto = await getAnteproyectoBySlug(slug);
  
  const users = anteproyecto?.users.map(({id, name, lastname, email, role}) => ({ id, fullname: name+' '+lastname, email, role}))
  
  return (
    <>
      <AnteproyectoForm anteproyecto={anteproyecto!} users={users ?? []} />
    </>
  )

}