import { Scan } from "lucide-react";

interface QRScanCounterProps {
  scanCount: number;
  uniqueScanCount: number;
}

export function QRScanCounter({ scanCount, uniqueScanCount }: QRScanCounterProps) {
  return (
    <div className="flex gap-4">
      <div className="text-center">
        <div className="flex items-center gap-1">
          <Scan className="w-4 h-4 text-green-500" />
          <div className="text-2xl font-semibold text-green-600">{scanCount}</div>
        </div>
        <div className="text-sm text-gray-500">Total escaneos</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-semibold text-blue-600">{uniqueScanCount}</div>
        <div className="text-sm text-gray-500">Únicos</div>
      </div>
    </div>
  );
}