import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const AnalyticsHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Datos Analíticos</h1>
      <div className="flex gap-4">
        <Button variant="outline" className="text-red-500 hover:text-red-600">
          Salir de la demostración
        </Button>
        <Button className="bg-green-50 text-green-600 hover:bg-green-100 gap-2">
          <ArrowUpRight className="h-4 w-4" />
          Exportar información
        </Button>
      </div>
    </div>
  );
};