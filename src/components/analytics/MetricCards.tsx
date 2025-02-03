import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardsProps {
  isDemoMode: boolean;
  analyticsData?: {
    qrCodes: any[];
    scans: any[];
  };
  isLoading: boolean;
}

export const MetricCards = ({ isDemoMode, analyticsData, isLoading }: MetricCardsProps) => {
  const getMetrics = () => {
    if (isDemoMode) {
      return {
        totalCodes: 4,
        totalScans: 309,
        uniqueScans: 263,
      };
    }

    if (!analyticsData) return { totalCodes: 0, totalScans: 0, uniqueScans: 0 };

    const totalCodes = analyticsData.qrCodes.length;
    const totalScans = analyticsData.scans.length;
    const uniqueScans = analyticsData.scans.filter(scan => scan.is_unique).length;

    return { totalCodes, totalScans, uniqueScans };
  };

  const metrics = getMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white">
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de códigos QR</p>
              <p className="text-2xl font-semibold">{metrics.totalCodes}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-green-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de escaneos</p>
              <p className="text-2xl font-semibold">{metrics.totalScans}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-blue-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de escaneos únicos</p>
              <p className="text-2xl font-semibold">{metrics.uniqueScans}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};