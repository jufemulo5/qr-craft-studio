import { QRCodeCard } from "./QRCodeCard";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

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
      return data;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'qr_codes'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["qrCodes"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

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

  const handleDelete = async () => {
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