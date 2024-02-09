import { getTrabajoDeGradoBySlug } from "@/actions";
import TrabajoDeGradoView from "./ui/TrabajoDeGradoSlugPage";

interface Props {
  params: {
    slug: string
  }
}

export default async function TrabajoDeGradoSlugPage( {params}: Props ) {
  const { slug } = params;

  const trabajoDeGrado = await getTrabajoDeGradoBySlug(slug);

  return (
    <>
      <TrabajoDeGradoView trabajoDeGrado={trabajoDeGrado!} />
    </>
  )

}