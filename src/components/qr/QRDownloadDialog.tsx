import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Share2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import { toPng, toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";

interface QRDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  name: string;
}

const resolutions = [
  { label: "512x512", value: "512" },
  { label: "1024x1024", value: "1024" },
  { label: "2048x2048", value: "2048" },
  { label: "4096x4096", value: "4096" },
];

export function QRDownloadDialog({ open, onOpenChange, url, name }: QRDownloadDialogProps) {
  const [format, setFormat] = useState("png");
  const [resolution, setResolution] = useState("512");
  const { toast } = useToast();

  const handleDownload = async () => {
    const qrElement = document.getElementById("qr-code");
    if (!qrElement) return;

    try {
      let downloadUrl: string;
      let filename = `${name}-qr`;

      // Generar QR con la resolución seleccionada
      const size = parseInt(resolution);
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: size,
        margin: 2,
      });

      switch (format) {
        case "png":
          downloadUrl = await toPng(qrElement, { width: size, height: size });
          filename += ".png";
          break;
        case "jpg":
          downloadUrl = await toJpeg(qrElement, { width: size, height: size });
          filename += ".jpg";
          break;
        case "svg":
          // Generar SVG directamente desde QRCode
          const svgString = await QRCode.toString(url, {
            type: 'svg',
            width: size,
            margin: 2,
          });
          const blob = new Blob([svgString], { type: 'image/svg+xml' });
          downloadUrl = URL.createObjectURL(blob);
          filename += ".svg";
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
      console.error("Error al descargar:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo descargar el código QR",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Elija el formato de descarga</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <RadioGroup
            value={format}
            onValueChange={setFormat}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            <div className="flex flex-col items-center gap-2">
              <Label
                htmlFor="png"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer hover:bg-accent"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <img src="/placeholder.svg" alt="PNG" className="w-6 h-6" />
                </div>
                <span>PNG</span>
                <RadioGroupItem value="png" id="png" className="sr-only" />
              </Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Label
                htmlFor="jpg"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer hover:bg-accent"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <img src="/placeholder.svg" alt="JPEG" className="w-6 h-6" />
                </div>
                <span>JPEG</span>
                <RadioGroupItem value="jpg" id="jpg" className="sr-only" />
              </Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Label
                htmlFor="svg"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer hover:bg-accent"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <img src="/placeholder.svg" alt="SVG" className="w-6 h-6" />
                </div>
                <span>SVG</span>
                <RadioGroupItem value="svg" id="svg" className="sr-only" />
              </Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Label
                htmlFor="pdf"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer hover:bg-accent"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <img src="/placeholder.svg" alt="PDF" className="w-6 h-6" />
                </div>
                <span>PDF</span>
                <RadioGroupItem value="pdf" id="pdf" className="sr-only" />
              </Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label>Tamaño del archivo</Label>
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un tamaño" />
              </SelectTrigger>
              <SelectContent>
                {resolutions.map((res) => (
                  <SelectItem key={res.value} value={res.value}>
                    {res.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}