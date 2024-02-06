import { getAnteproyectoBySlug } from "@/actions/anteproyectos/get-anteproyecto-by-slug";
import AnteproyectoSlugView from "./ui/AnteproyectoSlugView";

interface Props {
  params: {
    slug: string
  }
}

export default async function AnteproyectoBySlugPage( {params}: Props ) {
  const { slug } = params;

  const anteproyecto = await getAnteproyectoBySlug(slug);

  return (
    <>
      <AnteproyectoSlugView anteproyecto={anteproyecto!} />
    </>
  )

}