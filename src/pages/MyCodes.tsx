import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EditQRDialog } from "@/components/EditQRDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, FolderPlus, Link2, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface QRCode {
  id: string;
  name: string;
  type: string;
  content: string;
  created_at: string;
  updated_at: string;
  folder: string | null;
  scans: number;
}

const MyCodes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [limit, setLimit] = useState("10");

  const { data: qrCodes, isLoading } = useQuery({
    queryKey: ["qrCodes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("qr_codes")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as QRCode[];
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
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado del código QR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipos de códigos QR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Sitio web</SelectItem>
              <SelectItem value="text">Texto</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Más recientes</SelectItem>
              <SelectItem value="name">Nombre</SelectItem>
              <SelectItem value="scans">Escaneos</SelectItem>
            </SelectContent>
          </Select>
          <Select value={limit} onValueChange={setLimit}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Cantidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox id="selectAll" />
            <label htmlFor="selectAll">Seleccionar todo</label>
          </div>

          {isLoading ? (
            <div>Cargando...</div>
          ) : (
            qrCodes?.map((qr) => (
              <Card key={qr.id} className="p-4">
                <div className="flex items-center gap-4">
                  <Checkbox id={`qr-${qr.id}`} />
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
                      <Button variant="outline">Descargar</Button>
                      <Button variant="outline">Detalle</Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>Mostrando 1-{qrCodes?.length || 0} de {qrCodes?.length || 0} resultados.</div>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Anterior
            </Button>
            <Button variant="outline">
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCodes;