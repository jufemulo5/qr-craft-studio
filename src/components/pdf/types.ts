
import { z } from "zod";

export const pdfFormSchema = z.object({
  name: z.string().min(1, "Por favor, ingrese un nombre para el código QR"),
  file: z.any().refine((file) => file instanceof File, "Por favor, seleccione un archivo PDF"),
});

export type PDFFormValues = z.infer<typeof pdfFormSchema>;
