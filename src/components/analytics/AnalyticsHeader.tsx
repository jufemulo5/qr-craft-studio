import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface AnalyticsHeaderProps {
  isDemoMode: boolean;
  onToggleMode: () => void;
}

export const AnalyticsHeader = ({ isDemoMode, onToggleMode }: AnalyticsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Datos Analíticos {isDemoMode ? "(Demo)" : ""}</h1>
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          className="text-red-500 hover:text-red-600"
          onClick={onToggleMode}
        >
          {isDemoMode ? "Salir de la demostración" : "Ver demostración"}
        </Button>
        <Button className="bg-green-50 text-green-600 hover:bg-green-100 gap-2">
          <ArrowUpRight className="h-4 w-4" />
          Exportar información
        </Button>
      </div>
    </div>
  );
};