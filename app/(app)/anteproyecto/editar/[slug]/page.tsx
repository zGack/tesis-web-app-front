import { getAnteproyectoBySlug } from "@/actions/anteproyectos/get-anteproyecto-by-slug";
import AnteproyectoForm from "@/components/anteproyectos/form/AnteproyectoForm";

interface Props {
  params: {
    slug: string
  }
}

export default async function AnteproyectoEditarPage( {params}: Props ) {
  const { slug } = params;

  const anteproyecto = await getAnteproyectoBySlug(slug);
  
  const users = anteproyecto?.users.map(({id, name, lastname, email, role}) => ({ id, fullname: name+' '+lastname, email, role}))
  
  return (
    <>
      <AnteproyectoForm anteproyecto={anteproyecto!} users={users ?? []} />
    </>
  )

}