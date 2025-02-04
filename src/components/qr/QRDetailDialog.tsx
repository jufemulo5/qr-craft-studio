import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRDownloadForm } from "@/components/QRDownloadForm";

interface QRDetailDialogProps {
  qrCode: {
    id: string;
    name: string;
    content: string;
  };
}

export function QRDetailDialog({ qrCode }: QRDetailDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Detalle</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalle del código QR</DialogTitle>
        </DialogHeader>
        <QRDownloadForm url={qrCode.content} name={qrCode.name} />
      </DialogContent>
    </Dialog>
  );
}