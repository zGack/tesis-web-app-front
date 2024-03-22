
import { getAnteproyectoByUserId, getAnteproyectos, getTrabajoDeGradoByUserId, getTrabajosDeGrado } from "@/actions";
import { auth } from "@/auth.config";
import { AnteproyectosTable } from "@/components/anteproyectos";
import TrabajoGradoTable from "@/components/trabajosDeGrado/table/TrabajoDeGradoTable";
import { redirect } from "next/navigation";

export default async function TrabajosDeGrado() {
  const { trabajosDeGrado } = await getTrabajosDeGrado();

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isEstudiante = session.user.role.includes("estudiante");

  const data = await getTrabajoDeGradoByUserId(session.user.id);

  const hasTrabajoDeGrado = !!data?.slug;

  if ( isEstudiante && hasTrabajoDeGrado ) {
    redirect(`/trabajo-de-grado/${data.slug}`)
  }

  return (
    <>
      {
        ( isEstudiante && !hasTrabajoDeGrado ) ? (
          <main className="flex justify-center py-8">
            <div className="border-2 border-gray-200 shadow-sm rounded-sm max-w-4xl p-5 flex flex-col grow justify-center">
              <h1 className="font-semibold text-2xl mb-4">Atención</h1>
              <p className="text-md text-gray-700">Aún no se la ha asignado un trabajo de grado, por favor pongase en contacto con un administrador para obtener más información.</p>
            </div>
          </main>
        ) : (
          <TrabajoGradoTable trabajosDegrado={trabajosDeGrado} />
        )
      }
    </>
  );
}
