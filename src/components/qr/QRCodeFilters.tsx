import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QRCodeFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  limit: string;
  setLimit: (value: string) => void;
}

export function QRCodeFilters({
  search,
  setSearch,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  sortBy,
  setSortBy,
  limit,
  setLimit,
}: QRCodeFiltersProps) {
  return (
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
  );
}