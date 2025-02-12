
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, FolderPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QRCodeFilters } from "@/components/qr/QRCodeFilters";
import { QRCodeList } from "@/components/qr/QRCodeList";
import { QRCodePagination } from "@/components/qr/QRCodePagination";
import { useIsMobile } from "@/hooks/use-mobile";

const MyCodes = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [limit, setLimit] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQRs, setSelectedQRs] = useState<Set<string>>(new Set());

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Mis códigos QR</h1>
        <div className="flex w-full md:w-auto gap-2 md:gap-3">
          <Button 
            variant="outline" 
            className="flex-1 md:flex-none items-center gap-2"
          >
            <FolderPlus className="w-4 h-4" />
            {!isMobile && "Carpeta nueva"}
          </Button>
          <Button 
            className="flex-1 md:flex-none items-center gap-2 bg-green-500 hover:bg-green-600"
            onClick={() => navigate('/qrgenerator')}
          >
            Crear código QR
          </Button>
        </div>
      </div>

      <Alert className="mb-6 bg-green-500/10 border-green-500/20">
        <AlertDescription className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-green-700">
          <div className="flex items-center gap-2">
            <span>¿Podría dejarnos una reseña del servicio? Es muy importante para nosotros.</span>
          </div>
          <div className="flex w-full md:w-auto items-center gap-2">
            <Button 
              variant="outline" 
              className="flex-1 md:flex-none text-green-700 border-green-500"
            >
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="aspect-square flex flex-col items-center justify-center border-dashed cursor-pointer hover:bg-gray-50">
            <FolderPlus className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-green-500 text-sm md:text-base">Carpeta nueva</span>
          </Card>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
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

        <QRCodeList
          selectedQRs={selectedQRs}
          setSelectedQRs={setSelectedQRs}
        />

        <QRCodePagination
          currentPage={currentPage}
          totalResults={0}
          limit={Number(limit)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MyCodes;
