import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EditQRDialog } from "@/components/EditQRDialog";
import { QRDetailDialog } from "@/components/qr/QRDetailDialog";
import { QRDownloadDialog } from "@/components/qr/QRDownloadDialog";
import { 
  Link2, 
  Download, 
  Scan, 
  Pencil, 
  Palette, 
  RefreshCw,
  Copy,
  Send,
  Pause,
  Trash2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

      // Primero cerramos el diálogo
      setShowDeleteDialog(false);
      // Luego notificamos el éxito
      toast.success('Código QR eliminado correctamente');
      // Finalmente actualizamos la lista
      await onDelete();
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
          <div className="flex gap-4">
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Scan className="w-4 h-4 text-green-500" />
                <div className="text-2xl font-semibold text-green-600">{scanCount}</div>
              </div>
              <div className="text-sm text-gray-500">Total escaneos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-blue-600">{uniqueScanCount}</div>
              <div className="text-sm text-gray-500">Únicos</div>
            </div>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Abrir menú</span>
                  <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 3C2.32843 3 3 2.32843 3 1.5C3 0.671573 2.32843 0 1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3Z" fill="currentColor"/>
                    <path d="M7.5 3C8.32843 3 9 2.32843 9 1.5C9 0.671573 8.32843 0 7.5 0C6.67157 0 6 0.671573 6 1.5C6 2.32843 6.67157 3 7.5 3Z" fill="currentColor"/>
                    <path d="M13.5 3C14.3284 3 15 2.32843 15 1.5C15 0.671573 14.3284 0 13.5 0C12.6716 0 12 0.671573 12 1.5C12 2.32843 12.6716 3 13.5 3Z" fill="currentColor"/>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar el contenido del QR
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Palette className="w-4 h-4 mr-2" />
                  Editar el diseño del QR
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Cambiar el tipo de QR
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar a
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600" 
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <QRDownloadDialog
        open={showDownloadDialog}
        onOpenChange={setShowDownloadDialog}
        url={qr.content}
        name={qr.name}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el código QR "{qr.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
