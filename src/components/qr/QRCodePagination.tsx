import { Button } from "@/components/ui/button";

interface QRCodePaginationProps {
  currentPage: number;
  totalResults: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function QRCodePagination({ currentPage, totalResults, limit, onPageChange }: QRCodePaginationProps) {
  const totalPages = Math.ceil(totalResults / Number(limit));
  
  return (
    <div className="flex justify-between items-center">
      <div>
        Mostrando {Math.min((currentPage - 1) * Number(limit) + 1, totalResults)}-
        {Math.min(currentPage * Number(limit), totalResults)} de {totalResults} resultados.
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}