import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface DistributionChartsProps {
  isDemoMode: boolean;
  analyticsData?: {
    qrCodes: any[];
    scans: any[];
  };
  isLoading: boolean;
}

const demoData = {
  osData: [
    { name: "iOS", value: 34.0 },
    { name: "Android", value: 33.7 },
    { name: "Windows", value: 17.5 },
    { name: "Linux", value: 6.1 },
    { name: "Mac OS", value: 6.1 },
  ],
  countryData: [
    { name: "United States", value: 16.2 },
    { name: "Canada", value: 13.6 },
    { name: "India", value: 10.4 },
    { name: "France", value: 10.0 },
    { name: "Spain", value: 9.4 },
  ],
  cityData: [
    { name: "New York", value: 8.7 },
    { name: "Montreal", value: 8.4 },
    { name: "Los Angeles", value: 7.1 },
    { name: "Mumbai", value: 5.5 },
    { name: "Toronto", value: 5.2 },
  ],
};

export const DistributionCharts = ({ isDemoMode, analyticsData, isLoading }: DistributionChartsProps) => {
  const calculateDistribution = (field: 'os' | 'country' | 'city') => {
    if (isDemoMode) {
      return field === 'os' ? demoData.osData : 
             field === 'country' ? demoData.countryData : 
             demoData.cityData;
    }

    if (!analyticsData?.scans) return [];

    const counts: { [key: string]: number } = {};
    let total = 0;

    analyticsData.scans.forEach(scan => {
      const value = scan[field];
      if (value) {
        counts[value] = (counts[value] || 0) + 1;
        total++;
      }
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        value: Number(((count / total) * 100).toFixed(1))
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Escaneos por sistema operativo</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={calculateDistribution('os')}
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
                  data={calculateDistribution('country')}
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
                  data={calculateDistribution('city')}
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