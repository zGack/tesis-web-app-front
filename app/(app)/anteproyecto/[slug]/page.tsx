import { getAnteproyectoBySlug } from "@/actions/anteproyectos/get-anteproyecto-by-slug";
import AnteproyectoSlugView from "./ui/AnteproyectoSlugView";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string
  }
}

export default async function AnteproyectoBySlugPage( {params}: Props ) {
  const { slug } = params;

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const anteproyecto = await getAnteproyectoBySlug(slug);

  return (
    <>
      <AnteproyectoSlugView anteproyecto={anteproyecto!} user={session.user} />
    </>
  )

}