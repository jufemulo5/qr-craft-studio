import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { EditQRDialog } from "@/components/EditQRDialog";
import { QRDownloadDialog } from "@/components/qr/QRDownloadDialog";
import { Link2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { QRScanCounter } from "./QRScanCounter";
import { QRCardActions } from "./QRCardActions";
import { QRCardMenu } from "./QRCardMenu";
import { DeleteQRDialog } from "./DeleteQRDialog";

interface QRCode {
  id: string;
  name: string;
  type: string;
  content: string;
  created_at: string;
  scans: number;
  unique_scans: number;
  last_scan_at: string | null;
}

interface QRCodeCardProps {
  qr: QRCode;
  onSelect: () => void;
  isSelected: boolean;
  onDelete: () => Promise<void>;
}

export function QRCodeCard({ qr, onSelect, isSelected, onDelete }: QRCodeCardProps) {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [scanCount, setScanCount] = useState(qr.scans || 0);
  const [uniqueScanCount, setUniqueScanCount] = useState(qr.unique_scans || 0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setScanCount(qr.scans || 0);
    setUniqueScanCount(qr.unique_scans || 0);
  }, [qr.scans, qr.unique_scans]);

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'qr_codes',
          filter: `id=eq.${qr.id}`
        },
        (payload: any) => {
          const newData = payload.new;
          setScanCount(newData.scans || 0);
          setUniqueScanCount(newData.unique_scans || 0);
          
          toast.success('¡Nuevo escaneo detectado!', {
            description: `El código "${qr.name}" ha sido escaneado.`
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qr.id, qr.name]);

  const handleDelete = async () => {
    if (isDeleting) return;
    
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('qr_codes')
        .delete()
        .eq('id', qr.id);

      if (error) throw error;

      setShowDeleteDialog(false);
      await onDelete();
      toast.success('Código QR eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el código QR:', error);
      toast.error('Error al eliminar el código QR');
      setShowDeleteDialog(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <Checkbox 
          id={`qr-${qr.id}`} 
          checked={isSelected} 
          onCheckedChange={onSelect} 
        />
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
          <QRScanCounter 
            scanCount={scanCount} 
            uniqueScanCount={uniqueScanCount} 
          />
          <div className="flex gap-2">
            <QRCardActions
              qrCode={qr}
              onDownload={() => setShowDownloadDialog(true)}
            />
            <QRCardMenu onDelete={() => setShowDeleteDialog(true)} />
          </div>
        </div>
      </div>

      <QRDownloadDialog
        open={showDownloadDialog}
        onOpenChange={setShowDownloadDialog}
        url={qr.content}
        name={qr.name}
      />

      <DeleteQRDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        qrName={qr.name}
      />
    </Card>
  );
}