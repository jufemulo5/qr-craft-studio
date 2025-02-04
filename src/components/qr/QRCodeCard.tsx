import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EditQRDialog } from "@/components/EditQRDialog";
import { QRDetailDialog } from "@/components/qr/QRDetailDialog";
import { QRDownloadDialog } from "@/components/qr/QRDownloadDialog";
import { Link2, MoreVertical, Download } from "lucide-react";

interface QRCode {
  id: string;
  name: string;
  type: string;
  content: string;
  created_at: string;
  scans: number;
}

interface QRCodeCardProps {
  qr: QRCode;
  onSelect: () => void;
  isSelected: boolean;
}

export function QRCodeCard({ qr, onSelect, isSelected }: QRCodeCardProps) {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <Checkbox id={`qr-${qr.id}`} checked={isSelected} onCheckedChange={onSelect} />
        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qr.content)}`}
            alt={`QR Code for ${qr.name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{qr.type}</span>
            <h3 className="font-medium">{qr.name}</h3>
            <EditQRDialog qrCode={qr} />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{new Date(qr.created_at).toLocaleDateString()}</span>
            <div className="flex items-center gap-1">
              <Link2 className="w-4 h-4" />
              <span className="text-gray-700">{qr.content}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold">{qr.scans}</div>
            <div className="text-sm text-gray-500">Escaneos</div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowDownloadDialog(true)}
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
            <QRDetailDialog qrCode={qr} />
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <QRDownloadDialog
        open={showDownloadDialog}
        onOpenChange={setShowDownloadDialog}
        url={qr.content}
        name={qr.name}
      />
    </Card>
  );
}