import { getAnteproyectoBySlug } from "@/actions/anteproyectos/get-anteproyecto-by-slug";
import AnteproyectoForm from "@/components/anteproyectos/form/AnteproyectoForm";

export default async function AnteproyectoCreacionPage() {

  const anteproyecto = await getAnteproyectoBySlug('new');
  
  return (
    <>
      <AnteproyectoForm anteproyecto={anteproyecto ?? {}} users={[]} creacion={true} />
    </>
  )

}
