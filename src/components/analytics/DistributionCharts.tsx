import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";

const osData = [
  { name: "iOS", value: 34.0 },
  { name: "Android", value: 33.7 },
  { name: "Windows", value: 17.5 },
  { name: "Linux", value: 6.1 },
  { name: "Mac OS", value: 6.1 },
];

const countryData = [
  { name: "United States", value: 16.2 },
  { name: "Canada", value: 13.6 },
  { name: "India", value: 10.4 },
  { name: "France", value: 10.0 },
  { name: "Spain", value: 9.4 },
];

const cityData = [
  { name: "New York", value: 8.7 },
  { name: "Montreal", value: 8.4 },
  { name: "Los Angeles", value: 7.1 },
  { name: "Mumbai", value: 5.5 },
  { name: "Toronto", value: 5.2 },
];

export const DistributionCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Escaneos por sistema operativo</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={osData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#10B981"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Escaneos por país</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#F97316"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Escaneos por región/ciudad</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cityData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#3B82F6"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};