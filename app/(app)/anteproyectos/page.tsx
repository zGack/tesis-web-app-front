import { getAnteproyectos } from "@/actions"
import { AnteproyectosTable } from "@/components/anteproyectos";


export default async function Anteproyectos() {
  
  const { anteproyectos }= await getAnteproyectos();

  return (
    <>
      <AnteproyectosTable anteproyectos={anteproyectos} />
    </>
  )
}
  