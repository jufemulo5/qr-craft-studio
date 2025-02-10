
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QRNameField } from "./QRNameField";
import { supabase } from "@/integrations/supabase/client";
import { PDFUploadZone } from "./pdf/PDFUploadZone";
import { pdfFormSchema, PDFFormValues } from "./pdf/types";

interface PDFQRFormProps {
  onBack: () => void;
  onSubmit: (values: { url: string; name: string }) => void;
}

export function PDFQRForm({ onBack, onSubmit }: PDFQRFormProps) {
  const { toast } = useToast();
  
  const form = useForm<PDFFormValues>({
    resolver: zodResolver(pdfFormSchema),
    defaultValues: {
      name: "",
    },
  });

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

            <PDFUploadZone setValue={form.setValue} />
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
