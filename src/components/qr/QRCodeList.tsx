import { QRCodeCard } from "./QRCodeCard";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  selectedQRs: Set<string>;
  setSelectedQRs: (value: Set<string>) => void;
}

export function QRCodeList({ selectedQRs, setSelectedQRs }: QRCodeListProps) {
  const queryClient = useQueryClient();

  const { data: qrCodes = [], isLoading } = useQuery({
    queryKey: ["qrCodes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("qr_codes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Asegurarnos de que no hay duplicados usando el id como clave
      const uniqueQRCodes = Array.from(
        new Map(data.map(item => [item.id, item])).values()
      );

      return uniqueQRCodes;
    },
  });

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

  const handleDelete = async (id: string) => {
    await queryClient.invalidateQueries({ queryKey: ["qrCodes"] });
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

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
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}