import { Button } from "@/components/ui/button";
import { QRDetailDialog } from "@/components/qr/QRDetailDialog";
import { Download } from "lucide-react";

interface QRCardActionsProps {
  qrCode: {
    id: string;
    content: string;
    name: string;
  };
  onDownload: () => void;
}

export function QRCardActions({ qrCode, onDownload }: QRCardActionsProps) {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={onDownload}
      >
        <Download className="w-4 h-4 mr-2" />
        Descargar
      </Button>
      <QRDetailDialog qrCode={qrCode} />
    </div>
  );
}