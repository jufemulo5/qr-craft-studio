import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import QRCode from "qrcode";
import { useQueryClient } from "@tanstack/react-query";

interface EditQRDialogProps {
  qrCode: {
    id: string;
    name: string;
    content: string;
  };
}

export function EditQRDialog({ qrCode }: EditQRDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(qrCode.name);
  const [url, setUrl] = useState(qrCode.content);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generar nuevo QR
      const dataUrl = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
      });

      // Actualizar en base de datos
      const { error } = await supabase
        .from('qr_codes')
        .update({ 
          name: name,
          content: url,
        })
        .eq('id', qrCode.id);

      if (error) throw error;

      // Actualizar cache y UI
      await queryClient.invalidateQueries({ queryKey: ['qrCodes'] });
      
      toast({
        title: "¡Código QR actualizado!",
        description: "Los cambios se han guardado correctamente.",
      });
      
      setOpen(false);
    } catch (error) {
      console.error('Error updating QR code:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el código QR",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar código QR</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del código QR"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              URL
            </label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ejemplo.com"
              type="url"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              Guardar cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}