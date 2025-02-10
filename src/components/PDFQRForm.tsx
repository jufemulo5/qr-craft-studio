
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QRNameField } from "./QRNameField";
import { supabase } from "@/integrations/supabase/client";

const pdfFormSchema = z.object({
  name: z.string().min(1, "Por favor, ingrese un nombre para el código QR"),
  file: z.any().refine((file) => file instanceof File, "Por favor, seleccione un archivo PDF"),
});

type PDFFormValues = z.infer<typeof pdfFormSchema>;

interface PDFQRFormProps {
  onBack: () => void;
  onSubmit: (values: { url: string; name: string }) => void;
}

export function PDFQRForm({ onBack, onSubmit }: PDFQRFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<PDFFormValues>({
    resolver: zodResolver(pdfFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleFileDrop = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, seleccione un archivo PDF",
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB
      toast({
        variant: "destructive",
        title: "Error",
        description: "El archivo no debe superar los 100MB",
      });
      return;
    }

    form.setValue("file", file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileDrop(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileDrop(file);
    }
  };

  const handleSubmit = async (values: PDFFormValues) => {
    try {
      const file = values.file as File;
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('pdfs')
        .getPublicUrl(filePath);

      onSubmit({
        url: publicUrl,
        name: values.name,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar el archivo. Por favor, intente nuevamente.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="bg-white rounded-lg p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Archivo PDF</h2>
                <p className="text-sm text-muted-foreground">
                  Cargue el archivo PDF que desee mostrar.
                </p>
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? "border-primary bg-primary/5" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="mx-auto w-12 h-12 mb-4">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Arrastre y suelte su archivo PDF aquí o
              </p>
              <label className="inline-block">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                <span className="text-primary hover:underline cursor-pointer">
                  seleccione un archivo
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Tamaño máximo: 100 MB
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center text-primary font-medium">
                QR
              </div>
              <div>
                <h2 className="text-lg font-semibold">Nombre del código QR</h2>
                <p className="text-sm text-muted-foreground">
                  Ponga un nombre a su código QR.
                </p>
              </div>
            </div>

            <QRNameField form={form} />
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              Volver
            </Button>
            <Button type="submit">
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
