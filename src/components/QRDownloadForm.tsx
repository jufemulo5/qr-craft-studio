import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Mail, Check } from "lucide-react";
import QRCode from "qrcode";
import { toPng, toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const downloadFormSchema = z.object({
  email: z.string().email("Por favor, ingrese un email válido").optional(),
  format: z.enum(["png", "jpg", "pdf"]),
});

type DownloadFormValues = z.infer<typeof downloadFormSchema>;

interface QRDownloadFormProps {
  url: string;
  name: string;
}

export function QRDownloadForm({ url, name }: QRDownloadFormProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const { toast } = useToast();
  
  const form = useForm<DownloadFormValues>({
    resolver: zodResolver(downloadFormSchema),
    defaultValues: {
      email: "",
      format: "png",
    },
  });

  // Generar QR al montar el componente
  useState(() => {
    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
    }).then(setQrDataUrl);
  });

  const handleDownload = async (format: string) => {
    const qrElement = document.getElementById("qr-code");
    if (!qrElement) return;

    try {
      let downloadUrl: string;
      let filename = `${name}-qr`;

      switch (format) {
        case "png":
          downloadUrl = await toPng(qrElement);
          filename += ".png";
          break;
        case "jpg":
          downloadUrl = await toJpeg(qrElement);
          filename += ".jpg";
          break;
        case "pdf":
          const pdf = new jsPDF();
          const imgData = await toPng(qrElement);
          pdf.addImage(imgData, "PNG", 10, 10, 190, 190);
          pdf.save(`${filename}.pdf`);
          return;
        default:
          return;
      }

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "¡Descarga completada!",
        description: `Su código QR ha sido descargado como ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo descargar el código QR",
      });
    }
  };

  const handleSubmit = async (values: DownloadFormValues) => {
    // Aquí iría la lógica para enviar el correo electrónico
    // Por ahora solo mostraremos un toast de éxito
    toast({
      title: "¡Correo enviado!",
      description: "El código QR ha sido enviado a su correo electrónico",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Check className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Su código QR está listo</h2>
            <p className="text-sm text-muted-foreground">
              Descargue su código QR o recíbalo por correo electrónico
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div 
            id="qr-code"
            className="bg-white p-4 rounded-lg shadow-sm border-2 border-dashed border-primary/20"
          >
            {qrDataUrl && (
              <img 
                src={qrDataUrl} 
                alt="QR Code" 
                className="w-64 h-64"
              />
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formato de descarga</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un formato" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="jpg">JPG</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="button"
                  className="flex-1"
                  onClick={() => handleDownload(form.getValues("format"))}
                >
                  <Download className="w-4 h-4" />
                  Descargar
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    o reciba por correo
                  </span>
                </div>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="outline" className="w-full">
                <Mail className="w-4 h-4" />
                Enviar por correo
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}