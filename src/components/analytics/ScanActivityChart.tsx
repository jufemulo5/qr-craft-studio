import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Ene 05", scans: 5, uniqueScans: 3 },
  { name: "Ene 06", scans: 10, uniqueScans: 7 },
  { name: "Ene 07", scans: 15, uniqueScans: 12 },
  { name: "Ene 08", scans: 8, uniqueScans: 6 },
  { name: "Ene 09", scans: 12, uniqueScans: 9 },
  { name: "Ene 10", scans: 18, uniqueScans: 15 },
];

export const ScanActivityChart = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Actividades de escaneo de códigos QR</h2>
        <p className="text-sm text-gray-500">Ene 5, 2025 - Feb 3, 2025</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="scans"
              stroke="#10B981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="uniqueScans"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};