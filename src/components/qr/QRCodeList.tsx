import { QRCodeCard } from "./QRCodeCard";
import { Checkbox } from "@/components/ui/checkbox";

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

interface QRCodeListProps {
  qrCodes: QRCode[];
  selectedQRs: Set<string>;
  setSelectedQRs: (value: Set<string>) => void;
}

export function QRCodeList({ qrCodes, selectedQRs, setSelectedQRs }: QRCodeListProps) {
  const handleSelectAll = () => {
    if (selectedQRs.size === qrCodes.length) {
      setSelectedQRs(new Set());
    } else {
      setSelectedQRs(new Set(qrCodes.map(qr => qr.id)));
    }
  };

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedQRs);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedQRs(newSelected);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox 
          id="selectAll" 
          checked={selectedQRs.size === qrCodes.length && qrCodes.length > 0}
          onCheckedChange={handleSelectAll}
        />
        <label htmlFor="selectAll">Seleccionar todo</label>
      </div>

      {qrCodes.map((qr) => (
        <QRCodeCard
          key={qr.id}
          qr={qr}
          onSelect={() => handleSelect(qr.id)}
          isSelected={selectedQRs.has(qr.id)}
        />
      ))}
    </div>
  );
}