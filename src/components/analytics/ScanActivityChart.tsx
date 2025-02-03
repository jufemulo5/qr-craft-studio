import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { format, subDays } from "date-fns";
import { es } from "date-fns/locale";

interface ScanActivityChartProps {
  isDemoMode: boolean;
  analyticsData?: {
    qrCodes: any[];
    scans: any[];
  };
  isLoading: boolean;
}

const demoData = [
  { name: "Ene 05", scans: 5, uniqueScans: 3 },
  { name: "Ene 06", scans: 10, uniqueScans: 7 },
  { name: "Ene 07", scans: 15, uniqueScans: 12 },
  { name: "Ene 08", scans: 8, uniqueScans: 6 },
  { name: "Ene 09", scans: 12, uniqueScans: 9 },
  { name: "Ene 10", scans: 18, uniqueScans: 15 },
];

export const ScanActivityChart = ({ isDemoMode, analyticsData, isLoading }: ScanActivityChartProps) => {
  const getChartData = () => {
    if (isDemoMode) return demoData;

    if (!analyticsData?.scans) return [];

    // Get last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      return format(date, "MMM dd", { locale: es });
    }).reverse();

    return days.map(day => {
      const dayScans = analyticsData.scans.filter(scan => 
        format(new Date(scan.scanned_at), "MMM dd", { locale: es }) === day
      );

      return {
        name: day,
        scans: dayScans.length,
        uniqueScans: dayScans.filter(scan => scan.is_unique).length
      };
    });
  };

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Actividades de escaneo de códigos QR</h2>
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  const chartData = getChartData();

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Actividades de escaneo de códigos QR</h2>
        <p className="text-sm text-gray-500">Últimos 7 días</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="scans"
              stroke="#10B981"
              strokeWidth={2}
              name="Escaneos"
            />
            <Line
              type="monotone"
              dataKey="uniqueScans"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Escaneos únicos"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};