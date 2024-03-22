"use server";

import { ValidRoles } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Anteproyecto, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const anteproyectoSchema = z.object({
  id: z.string().uuid(),
  fechaEntregaAEvaluador: z.coerce.date().optional().nullable(),
  fechaEntregaDeEvaluador: z.coerce.date().optional().nullable(),
  estado: z.coerce.number().min(1).max(4),
  noEntrega: z.coerce.number().min(0).max(4),
  // documento: z
  //   .object({
  //     name: z.string(),
  //     size: z.number(),
  //     type: z.string(),
  //     lastModified: z.number(),
  //   })
  //   .nullable()
  //   .optional(),
  // correciones: z
  //   .object({
  //     name: z.string(),
  //     size: z.number(),
  //     type: z.string(),
  //     lastModified: z.number(),
  //   })
  //   .nullable()
  //   .optional(),
});

export const updateAnteproyectoDocuments = async (anteproyectoData: string, documentsFormData?: FormData) => {
  const anteproyectoParsed = anteproyectoSchema.safeParse(
    JSON.parse(anteproyectoData)
  );

  if (!anteproyectoParsed.success) {
    console.log(anteproyectoParsed.error);
    return { ok: false };
  }

  const anteproyecto = anteproyectoParsed.data;

  const { id, ...rest } = anteproyecto;

  try {
    let anteproyecto: Anteproyecto;

    // anteproyecto = await prisma.anteproyecto.update({
    //   where: { id },
    //   data: {
    //     ...rest,
    //   },

    // })

    // revalidatePath('/anteproyectos');
    // revalidatePath(`/anteproyecto/${anteproyecto.slug}`);
    // revalidatePath(`/anteproyecto/editar/${anteproyecto.slug}`);

    console.log(documentsFormData!.get('documento'));

    const documento = await uploadDocument(documentsFormData!.get('documento') as File);

    console.log(documento);

    return {
      ok: true,
      anteproyecto: anteproyecto!,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: "Error al actualizar/crear anteproyecto, revisar logs",
    };
  }
};

const uploadDocument = async (document: File) => {
  try {
    const buffer = await document.arrayBuffer();
    const base64Document = Buffer.from(buffer).toString("base64");

    return cloudinary.uploader
      .upload(`data:document/pdf,${base64Document}`)
      .then((r) => r.secure_url);
  } catch (error) {
    console.log(error);
    return null;
  }
};
