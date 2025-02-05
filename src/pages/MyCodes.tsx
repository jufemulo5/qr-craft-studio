import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, FolderPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { QRCodeFilters } from "@/components/qr/QRCodeFilters";
import { QRCodeList } from "@/components/qr/QRCodeList";
import { QRCodePagination } from "@/components/qr/QRCodePagination";

const MyCodes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [limit, setLimit] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQRs, setSelectedQRs] = useState<Set<string>>(new Set());

  const { data: qrCodes, isLoading } = useQuery({
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Mis códigos QR</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <FolderPlus className="w-4 h-4" />
            Carpeta nueva
          </Button>
          <Button 
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
            onClick={() => navigate('/qrgenerator')}
          >
            Crear código QR
          </Button>
        </div>
      </div>

      <Alert className="mb-6 bg-green-500/10 border-green-500/20">
        <AlertDescription className="flex justify-between items-center text-green-700">
          <div className="flex items-center gap-2">
            <span>¿Podría dejarnos una reseña del servicio? Es muy importante para nosotros.</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-green-700 border-green-500">
              Escribir una reseña
            </Button>
            <Button variant="ghost" size="icon">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Mis carpetas</h2>
        <Card className="w-48 h-48 flex flex-col items-center justify-center border-dashed cursor-pointer hover:bg-gray-50">
          <FolderPlus className="w-8 h-8 text-green-500 mb-2" />
          <span className="text-green-500">Carpeta nueva</span>
        </Card>
      </div>

      <div className="space-y-6">
        <QRCodeFilters
          search={search}
          setSearch={setSearch}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          limit={limit}
          setLimit={setLimit}
        />

        {isLoading ? (
          <div>Cargando...</div>
        ) : (
          <>
            <QRCodeList
              qrCodes={qrCodes || []}
              selectedQRs={selectedQRs}
              setSelectedQRs={setSelectedQRs}
            />

            <QRCodePagination
              currentPage={currentPage}
              totalResults={qrCodes?.length || 0}
              limit={Number(limit)}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MyCodes;