import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Share2 } from "lucide-react";
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
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // Generate QR code when dialog opens or URL changes
  useState(() => {
    const generateQR = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(url, {
          width: parseInt(resolution),
          margin: 2,
        });
        setQrDataUrl(dataUrl);
      } catch (error) {
        console.error("Error generating QR:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo generar el código QR",
        });
      }
    };
    if (open) {
      generateQR();
    }
  });

  const handleDownload = async () => {
    const qrElement = document.getElementById("qr-preview");
    if (!qrElement) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo encontrar el elemento QR",
      });
      return;
    }

    try {
      let downloadUrl: string;
      let filename = `${name}-qr`;
      const size = parseInt(resolution);

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
          <div 
            id="qr-preview"
            className="mx-auto bg-white p-4 rounded-lg shadow-sm border-2 border-dashed border-primary/20 w-48 h-48"
          >
            {qrDataUrl && (
              <img 
                src={qrDataUrl} 
                alt="QR Code Preview" 
                className="w-full h-full"
              />
            )}
          </div>

          <RadioGroup
            value={format}
            onValueChange={setFormat}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {["png", "jpg", "svg", "pdf"].map((fmt) => (
              <div key={fmt} className="flex items-center space-x-2">
                <RadioGroupItem value={fmt} id={fmt} />
                <Label htmlFor={fmt} className="capitalize">
                  {fmt.toUpperCase()}
                </Label>
              </div>
            ))}
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